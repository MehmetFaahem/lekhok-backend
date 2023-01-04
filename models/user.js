const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  img: {
    type: String,
  },
  joinedDate: {
    type: String,
    default:
      new Date().getDate() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getFullYear(),
  },
});

module.exports = mongoose.model("Lekhoks", userSchema);
