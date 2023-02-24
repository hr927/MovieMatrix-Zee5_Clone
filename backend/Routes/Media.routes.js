const express = require("express");
const { authenticate } = require("../Middleware/authenticate.middleware");
const { MediaModel } = require("../Model/Media.model");

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const media = await MediaModel.find(query);
    res.send(media);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.get("/adminmedia", async (req, res) => {
  const query = req.query;
  const limit = 10;
  const skip = (query.page - 1) * limit;
  try {
    const media = await MediaModel.find(query).skip(skip).limit(limit);
    console.log(media);
    res.send(media);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});
mediaRouter.get("/details/:id", async (req, res) => {
  const mediaID = req.params.id;
  try {
    const media = await MediaModel.find({ _id: mediaID });
    res.send(media);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.post("/create", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const media = new MediaModel(payload);
    await media.save();
    res.send({ msg: "New Media Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.patch("/update/:id", authenticate, async (req, res) => {
  const mediaID = req.params.id;
  const payload = req.body;
  try {
    const media = await MediaModel.findByIdAndUpdate({ _id: mediaID }, payload);
    res.send({ msg: "Media Updated" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.delete("/delete/:id", authenticate, async (req, res) => {
  const mediaID = req.params.id;
  try {
    const media = await MediaModel.findByIdAndDelete({ _id: mediaID });
    res.send({ msg: "Media Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { mediaRouter };
