const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  firm: String,
  shortDesc: String,
  category: String,
  level: String,
  language: String,
  syllabus: String,
  duration: String,
  learn: String,
  lectures: Number,
  price: Number,
    thumbnail: String,

 seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},
cloudinary_id: {
  type: String,
},
reviews: [{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
}],
averageRating: {
  type: Number,
  default: 0
}
},
 { timestamps: true });


module.exports = mongoose.model("Course", courseSchema);
