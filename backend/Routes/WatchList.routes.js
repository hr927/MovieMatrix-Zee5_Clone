const express = require("express");
const { authenticate } = require("../Middleware/authenticate.middleware");
const { WatchListModel } = require("../Model/WatchList.model");

const watchListRouter = express.Router();

watchListRouter.get("/", authenticate, async (req, res) => {
  const user = req.body.user;
  console.log(user);
  try {
    const watchList = await WatchListModel.find({ user });
    res.send(watchList);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

watchListRouter.post("/add", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const watchList = new WatchListModel(payload);
    await watchList.save();
    res.send({ msg: "Added to watchList" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

watchListRouter.delete("/delete/:id", authenticate, async (req, res) => {
  const watchListID = req.params.id;
  try {
    const watchList = await WatchListModel.findByIdAndDelete({
      _id: watchListID,
    });
    res.send({ msg: "Deleted from watchList" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { watchListRouter };
