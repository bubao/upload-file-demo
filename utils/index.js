const prisma = require("./db/prisma");
const joiValidator = require("./joi/validate");

const errcode = require("./error/errcode");
const MyError = require("./error/MyError");
module.exports = {
	prisma,

	errcode,
	MyError,

	joiValidator
};
