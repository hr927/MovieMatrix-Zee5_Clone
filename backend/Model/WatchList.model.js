const mongoose = require("mongoose");

const watchListSchema = mongoose.Schema({
  userId: String,
  showId: String,
  showName: String,
  showPoster: String,
});

const WatchListModel = mongoose.model("review", watchListSchema);

module.exports = { WatchListModel };
