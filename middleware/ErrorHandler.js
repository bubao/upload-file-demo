
const errcode = require("../utils/error/errcode");
/**
 * @description
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function ErrorHandler(err, req, res) {
	// * 统一错误处理
	if (err.status === 400 && !err.errcode && err.expose) {
		const { status, body } = errcode(40001, err);
		return res.status(status)
			.json(body);
	}

	if (err.errcode) {
		const error = errcode(err.errcode);
		res.status(error.status)
			.send({ ...error.body, ...(err.name === "MyError" ? err.resBody : {}) });
	} else {
		const error = errcode(404);
		res.status(error.status)
			.send({ ...error.body, ...(err.name === "MyError" ? err.resBody : {}) });
	}
}

module.exports = ErrorHandler;
