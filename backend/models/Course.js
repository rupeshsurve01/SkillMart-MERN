const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  category: String,
  level: String,
  language: String,
  syllabus: String,
  duration: String,
  learn: String,
  lectures: Number,
  price: Number,
  thumbnail: String
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
