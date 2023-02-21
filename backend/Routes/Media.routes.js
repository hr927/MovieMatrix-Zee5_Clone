const express = require("express");
const { MediaModel } = require("../Model/Media.model");

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res) => {
  try {
    const media = await MediaModel.find();
    res.send(media);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const media = new MediaModel(payload);
    await media.save();
    res.send({ msg: "New Media Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.patch("/update/:id", async (req, res) => {
  const mediaID = req.params.id;
  const payload = req.body;
  try {
    const media = await MediaModel.findByIdAndUpdate({ _id: mediaID }, payload);
    res.send({ msg: "Media Updated" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

mediaRouter.delete("/create/:id", async (req, res) => {
  const mediaID = req.params.id;
  try {
    const media = await MediaModel.findByIdAndDelete({ _id: mediaID });
    res.send({ msg: "Media Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { mediaRouter };
