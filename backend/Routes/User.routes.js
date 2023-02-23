const express = require("express");
const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticate } = require("../Middleware/authenticate.middleware");

const userRouter = express.Router();

userRouter.get("/", authenticate, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.find({
      name,
      email,
    });
    if (user.length > 0) {
      res.send({ msg: "User already exists" });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.send({ msg: "Something went Wrong", error: err.message });
        } else {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
          });
          await newUser.save();
          res.send({ msg: "New User Registered" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "movie");
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.send({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err.message });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete({ _id: userID });
    res.send("User Deleted");
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err.message });
  }
});

module.exports = { userRouter };
