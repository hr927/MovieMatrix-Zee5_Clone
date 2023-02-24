const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bio: String,
  preference: Array,
  img: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
