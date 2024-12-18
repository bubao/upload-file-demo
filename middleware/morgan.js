// eslint-disable-next-line no-unused-vars
const express = require("express");
const morgan = require("morgan");

morgan.token("requestId", function getId(req) {
	return `[${req.headers["X-Request-Id"] || "-"}]`;
});
morgan.token("authorization", function getId(req) {
	return `[${req.headers.authorization || "-"}]`;
});

/**
 *  custom token formats
 * @param {morgan.TokenIndexer} tokens
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns string
 */
function custom(tokens, req, res) {
	return [
		tokens["remote-addr"](req, res),
		tokens.method(req, res),
		tokens["remote-user"](req, res),
		tokens.requestId(req, res),
		tokens.authorization(req, res),
		`[${tokens.date(req, res, "iso")}]`,
		`"${tokens.method(req, res)
		} ${tokens.url(req, res)
		} HTTP/${tokens["http-version"](req, res)}"`,
		tokens.status(req, res),
		tokens.res(req, res, "content-length"),
		tokens.referrer(req, res),
		tokens["user-agent"](req, res),
		tokens["response-time"](req, res) + "ms"
	].join(" ");
}

module.exports = [
	morgan(custom, {
		skip: (req, res) => {
			return res.statusCode < 400;
		}
	}),
	morgan(custom, {
	})
];
