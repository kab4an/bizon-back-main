const router = require("express").Router();
const userMiddleware = require("../middlewares/auth");

router.get("/", userMiddleware, (req, res) => {
	res.json({
		error: null,
		user: req.user,
	});
});

module.exports = router;
