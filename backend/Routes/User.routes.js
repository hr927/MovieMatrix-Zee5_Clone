const express = require("express");
const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const multer = require('multer');
const {authenticate} =require("../Middleware/authenticate.middleware")


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
  const { name, email, password, bio, preference, img } = req.body;
  try {
    const user = await UserModel.find({
      email,
    });
    if (name === "" || email === "" || password === "") {
      res.send({ msg: "Please Enter all Details" });
    } else {
      if (user.length > 0) {
        res.send({
          data: { name, email, bio, preference, img },
          msg: "User already exists",
        });
      } else {
        bcrypt.hash(password, 3, async (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            res.send({ msg: "Something went Wrong", error: err });
          } else {
            const newUser = new UserModel({
              name,
              email,
              password: hash,
            });
            await newUser.save();
            res.send({
              data: { name, email, bio, preference, img },
              msg: "New User Registered",
            });
          }
        });
      }
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err });
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
      res.send({ msg: "Please Regiseter First" });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err });
  }
});

userRouter.post("/logout/:auth_token", (req, res) => {
  // Clear authentication token from client's cookie or local storage
  res.clearCookie("auth_token"); // If using cookies
  // OR
  // localStorage.removeItem('auth_token'); // If using local storage

  // Respond with success message
  res.status(200).json({ message: "Logout successful" });
});

// const User = require('./models/user');

userRouter.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
        Please  paste this token into your browser to complete the process:
        Token:${token}
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

userRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.put("/profile", async (req, res) => {
  try {
    const { name, email, bio, preference, img } = req.body;

    const findEmail = await UserModel.find({ email });
    console.log("findEmail: ", findEmail);

    if (findEmail) {
      const ID = findEmail[0]._id;
      console.log("ID: ", ID);

      const user = await UserModel.findByIdAndUpdate(
        { _id: ID },
        { name, email, bio, preference, img },
        { new: true }
      );
      console.log("user: ", user);
      res.json(user);
    } else {
      res.send({ msg: "email is not find" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = { userRouter };

//${process.env.CLIENT_URL}/reset-password/${token}\n\n
