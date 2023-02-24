const express = require("express");
const { authenticate } = require("../Middleware/authenticate.middleware");
const { ReviewModel } = require("../Model/Review.model");

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const review = await ReviewModel.find(query);
    res.send(review);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

reviewRouter.post("/create", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const review = new ReviewModel(payload);
    await review.save();
    res.send({ msg: "New review Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

reviewRouter.delete("/delete/:id", authenticate, async (req, res) => {
  const reviewID = req.params.id;
  try {
    const review = await ReviewModel.findByIdAndDelete({ _id: reviewID });
    res.send({ msg: "Review Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { reviewRouter };
