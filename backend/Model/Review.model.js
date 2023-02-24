const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: String,
  showId: String,
  userName: String,
  showName: String,
  heading: String,
  body: String,
  stars: Number,
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = { ReviewModel };
