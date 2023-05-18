const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: {type:String,required:true},
  password: {type:String,required:true},
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
