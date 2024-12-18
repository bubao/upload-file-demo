// eslint-disable-next-line no-unused-vars
const express = require("express");
/**
 *
 * @param {express.Router} fn
 * @returns {express.RouterOptions}
 */
function asyncHandler(fn) {
	/**
	 *
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * @param {Express.next} next
	 * @returns {Promise<void>}
	 */
	return (req, res, next) => {
		return Promise
			.resolve(fn(req, res, next))
			.catch(err => {
				next(err);
			});
	};
}

module.exports = asyncHandler;
