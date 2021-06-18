const router = require("express").Router();
const userMiddleware = require("../middlewares/auth");
const mongoose = require("mongoose");
const Request = require("../model/Requestation");

const Joi = require("@hapi/joi");
const e = require("express");

const requestSchema = Joi.object({
	date: Joi.string().min(6).max(255).required(),
	address: Joi.string().min(6).max(255).required(),
	type: Joi.string().min(6).max(255).required(),
});

router.post("/new", userMiddleware, async (req, res) => {
	const { error } = requestSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const request = new Request({
		date: req.body.date,
		address: req.body.address,
		type: req.body.type,
		user: req.user,
	});

	try {
		const savedRequest = await request.save();
		res.json({ error: null, data: savedRequest });
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.post("/status", userMiddleware, async (req, res) => {
	if (req.user.role == "MANAGER") {
		let re = await Request.findOne({
			_id: mongoose.Types.ObjectId(req.body.id),
		});
		if (re) {
			re.status = req.body.status;
			re.manager = req.user;
			await re.save();
			res.status(204).json({ data: "Updated" });
		} else {
			res.status(400).json({ error: "Request not found" });
		}
	} else {
		res.status(403).json({ error: "Not enough permission" });
	}
});

router.get("/", userMiddleware, async (req, res) => {
	let requests = await Request.find();
	res.status(200).json({ data: requests });
});

router.get("/:id", userMiddleware, async (req, res) => {
	try {
		let requests = await Request.find({ _id: req.params.id });
		res.status(200).json({ data: requests });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get("/user/:id", userMiddleware, async (req, res) => {
	try {
		let requests = await Request.find({ "user.id": req.params.id });
		res.status(200).json({ data: requests });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
