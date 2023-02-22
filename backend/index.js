const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");
const { adminRouter } = require("./Routes/Admin.routes");
const { userRouter } = require("./Routes/User.routes");
const { authenticate } = require("./Middleware/authenticate.middleware");
const { mediaRouter } = require("./Routes/Media.routes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);
// app.use(authenticate);
app.use("/media", mediaRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log("Server Running at" + process.env.port);
});
