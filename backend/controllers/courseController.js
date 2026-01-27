const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      thumbnail: req.file ? req.file.filename : null
    });

    res.json({
      message: "Course added",
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};
