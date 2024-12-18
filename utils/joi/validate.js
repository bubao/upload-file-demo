const pick = require("../method/pick");
const MyError = require("../error/MyError");
const Joi = require("joi");

/**
 * @description
 * @param {*} req
 * @param {*} schema
 * @return {*}
 */
function joiValidator(req, schema) {
	const validSchema = pick(schema, ["params", "query", "body"]);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: "key" }, abortEarly: false })
		.validate(object);

	if (error) {
		const errorMessage = error.details.map(details => details.message)
			.join(", ");
		throw new MyError(40001, { validate: errorMessage });
	}
	return value;
}

module.exports = joiValidator;
