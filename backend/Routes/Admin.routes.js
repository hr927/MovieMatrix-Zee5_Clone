const express = require("express");
const { AdminModel } = require("../Model/Admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminRouter = express.Router();

adminRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = await AdminModel.find({
      name,
      email,
    });
    if (admin.length > 0) {
      res.send({ msg: "admin already exists" });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.send({ msg: "Something went Wrong", error: err });
        } else {
          const newadmin = new AdminModel({
            name,
            email,
            password: hash,
          });
          await newadmin.save();
          res.send({ msg: "New admin Registered" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.find({ email });
    if (admin.length > 0) {
      bcrypt.compare(password, admin[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ adminID: admin[0]._id }, "movie");
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.send({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err });
  }
});

module.exports = { adminRouter };
