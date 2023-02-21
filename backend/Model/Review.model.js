const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: String,
  body: String,
  media: String,
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = { ReviewModel };
