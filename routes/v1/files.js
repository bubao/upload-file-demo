const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const zlib = require("zlib");
const crypto = require("crypto");
const { prisma, errcode, MyError } = require("../../utils");
const { downloadFileJoi } = require("./files.joi");
const validate = require("../../middleware/validate");

const router = express.Router();
const uploadDir =  "../../uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadDir),
	filename: (req, file, cb) => {
		const fileHash = crypto.createHash("md5")
			.update(file.originalname + Date.now())
			.digest("hex");
		const extension = path.extname(file.originalname);
		cb(null, `${fileHash}${extension}`);
	}
});

const upload = multer({ storage });

// 获取文件列表
router.get("/", async (req, res, next) => {
	try {
		const files = await prisma.files.findMany({
			orderBy: [{ "created_at": "desc" }]
		});
		console.log("files", files);
		const { body, status } = errcode(0, {
			files
		});
		res.status(status)
			.send(body);
	} catch (error) {
		next(error);
	}
});

// 上传文件
router.post("/upload", upload.single("file"), async (req, res, next) => {
	const { file_name } = req.body;
	const { path: filePath, size } = req.file;
	console.log(req.file);
	try {
		const file = await prisma.files.create({
			data: {
				file_name,
				file_path: filePath,
				file_size: size
			}
		})
			.catch(err => {
				err;
				throw new MyError(40000);
			});
		const { body, status } = errcode(0, {
			id: file.id
		});
		res.status(status)
			.send(body);
	} catch (error) {
		next(error);
	}
});

// 下载文件
router.get("/download/:id", validate(downloadFileJoi), async (req, res, next) => {
	try {
		const { id } = req.params;

		const file = await prisma.files.findUnique({
			where: {
				id
			}
		});
		if (!file) {
			throw new MyError(40003);
		}
		const gzip = zlib.createGzip();
		res.setHeader("Content-Type", "application/octet-stream");
		res.setHeader("Content-Encoding", "gzip");  // 设置gzip压缩标志
		// 设置文件大小
		res.setHeader("Content-Length", file.file_size);
		fs.createReadStream(file.file_path)
			.pipe(gzip)
			.pipe(res);
	} catch (error) {
		next(error);
	}
});

// 删除文件
router.delete("/:id", validate(downloadFileJoi), async (req, res, next) => {
	try {
		const { id } = req.params;

		const file = await prisma.files.findUnique({
			where: {
				id
			}
		});
		await fs.promises.unlink(file.file_path)
			.catch(() => {
				throw new MyError(40004);
			});

		await prisma.files.delete({
			where: {
				id
			}
		})
			.catch(() => {
				throw new MyError(40005);
			});

		const { body, status } = errcode(0, {});
		res.status(status)
			.send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
