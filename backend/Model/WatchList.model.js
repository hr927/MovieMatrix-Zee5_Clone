const mongoose = require("mongoose");

const watchListSchema = mongoose.Schema({
  user: String,
  mediaId: String,
  mediaName: String,
  mediaPoster: String,
});

const WatchListModel = mongoose.model("watchList", watchListSchema);

module.exports = { WatchListModel };
