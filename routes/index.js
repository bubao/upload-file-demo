const express = require("express");
const router = express.Router();
const files = require("./v1/files");

router.use("/api/files", files);

router.get("/", (req, res, next) => {
	res.render("index", (err, html) => {
		if (err) {
			// 传递错误给默认错误处理机制
			const error = new Error("Page not found");
			error.status = 404;
			return next(error);
		}
		res.send(html);
	});
});


module.exports = router;