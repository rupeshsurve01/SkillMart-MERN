const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    console.log("FILE:", req.file); // 🔍 debug

    const course = await Course.create({
      ...req.body,
      seller: seller,
      thumbnail: req.file ? req.file.filename : null,
    });

    res.json({
      message: "Course added",
      course,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

 exports.getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


