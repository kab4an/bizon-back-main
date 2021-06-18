const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  surname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  phone_number: {
    type: String,
    required: true,
    min: 11,
    max: 13,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  role: {
    type: String,
    required: true,
    min: 5,
    max: 25,
    default: "CUSTOMER"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);