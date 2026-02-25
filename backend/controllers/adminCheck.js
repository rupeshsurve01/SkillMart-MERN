const Course = require("../models/Course");

// GET PENDING COURSES
const getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "pending" })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE COURSE STATUS
const updateCourseStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.status = status;
    await course.save();

    res.json({ message: `Course ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPendingCourses, updateCourseStatus };