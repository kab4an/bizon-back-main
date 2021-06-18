const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	surname: Joi.string().min(3).max(255).required(),
	password: Joi.string().min(3).max(1024).required(),
	phone_number: Joi.string().min(11).max(13).required(),
});

const loginSchema = Joi.object({
	password: Joi.string().min(3).max(1024).required(),
	phone_number: Joi.string().min(11).max(13).required(),
});

router.post("/register", async (req, res) => {
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const isPhoneExist = await User.findOne({ email: req.body.phone_number });
	if (isPhoneExist)
		return res.status(400).json({ error: "Phone number already exists" });

	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		surname: req.body.surname,
		phone_number: req.body.phone_number,
		password,
	});

	try {
		const savedUser = await user.save();
		res.json({ error: null, data: savedUser });
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.post("/login", async (req, res) => {
	console.log(req.body);
	const { error } = loginSchema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const user = await User.findOne({ phone_number: req.body.phone_number });
	if (!user) return res.status(400).json({ error: "Phone number is wrong" });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(400).json({ error: "Password is wrong" });

	const token = jwt.sign(
		{
			name: user.name,
			surname: user.surname,
			phone_number: user.phone_number,
			id: user._id,
			role: user.role,
		},
		"secret key"
	);

	res.json({
		error: null,
		token,
	});
});

module.exports = router;
