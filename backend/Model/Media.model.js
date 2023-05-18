const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  title: {type:String,required:true},
  year: Number,
  director: {type:String,required:true},
  runtime: {type:String,required:true},
  mediaType: {type:String,required:true},
  genre: {type:[String],required:true},
  cast: {type:[String],required:true},
  plot: {type:String,required:true},
  rating: {type:Number,required:true},
  language: {type:String,required:true},
  trailer: {type:String,required:true},
  tags: {type:[String],required:true},
  poster: {type:String,required:true},
  bg_poster:{type:String,required:true},
});

const MediaModel = mongoose.model("media", mediaSchema);

module.exports = { MediaModel };
