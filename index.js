const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://root:root@cluster0.pm3ig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("connected to db")
);

const authRoutes = require("./routes/auth");
app.use("/api/user", authRoutes);

app.use("/api/user", require("./routes/profile"));
app.use("/api/request", require("./routes/requestation"));

app.listen(process.env.PORT || 8000, () => console.log("server is running..."));
