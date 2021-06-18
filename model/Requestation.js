const { request } = require("express");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
		min: 3,
		max: 128,
	},
	type: {
		type: String,
		required: true,
		min: 5,
		max: 25,
	},
	status: {
		type: String,
		required: true,
		default: "CREATED", // Accepted, Declined, Processing, Completed, Abandoned
	},
	user: {
		id: {
			type: String,
		},
		name: {
			type: String,
		},
		surname: {
			type: String,
		},
		phone_number: {
			type: String,
		},
		role: {
			type: String,
		},
	},
	manager: {
		id: {
			type: String,
		},
		name: {
			type: String,
		},
		surname: {
			type: String,
		},
		phone_number: {
			type: String,
		},
		role: {
			type: String,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Request", requestSchema);
