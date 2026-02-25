const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// ============================
// ENROLL COURSE
// ============================
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID missing" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Course not approved yet" });
    }

    const exists = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Course already enrolled" });
    }

    await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(200).json({ message: "Enrolled successfully" });

  } catch (error) {
    console.error("ENROLL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// GET MY LEARNING
// ============================
exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id; // coming from JWT

    const enrollments = await Enrollment.find({ user: userId })
      .populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
