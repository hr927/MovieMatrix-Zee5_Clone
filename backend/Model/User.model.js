const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: {type:String,required:true},
  password: {type:String,required:true},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bio: String,
  preference: Array,
  img: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
