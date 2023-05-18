const mongoose = require("mongoose");

const watchListSchema = mongoose.Schema({
  user: {type:String,required:true},
  mediaId: {type:String,required:true},
  mediaName: {type:String,required:true},
  mediaPoster: {type:String,required:true},
});

const WatchListModel = mongoose.model("watchList", watchListSchema);

module.exports = { WatchListModel };
