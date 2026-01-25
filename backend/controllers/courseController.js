const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json({ message: "Course added", course });
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};
