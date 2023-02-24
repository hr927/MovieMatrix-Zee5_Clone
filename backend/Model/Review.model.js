const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: String,
  showId: String,
  userName: String,
  showName: String,
  heading: String,
  body: String,
  stars: Number,
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = { ReviewModel };
