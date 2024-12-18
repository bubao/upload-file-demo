const Joi = require("joi");

const downloadFileJoi = {
	params:{
		id: Joi.number()
			.min(1)
			.required(true)
	}
};

module.exports = {
	downloadFileJoi
};