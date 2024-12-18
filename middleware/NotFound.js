
const errcode = require("../utils/error/errcode");
/**
 * @description
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function NotFound(req, res, next) {
	next(errcode(404).body);
}

module.exports = NotFound;
