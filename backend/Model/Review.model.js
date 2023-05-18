const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: {type:String,required:true},
  showId: {type:String,required:true},
  userName: {type:String,required:true},
  showName: {type:String,required:true},
  heading: {type:String,required:true},
  body: {type:String,required:true},
  stars: {type:Number,required:true},
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = { ReviewModel };
