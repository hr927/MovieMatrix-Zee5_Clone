const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  runtime: String,
  mediaType: String,
  genre: Array,
  cast: Array,
  plot: String,
  rating: Number,
  language: String,
  trailer: String,
  tags: Array,
  poster: String,
  bg_poster:String,
});

const MediaModel = mongoose.model("media", mediaSchema);

module.exports = { MediaModel };
