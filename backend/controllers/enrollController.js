const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// ============================
// ENROLL COURSE
// ============================
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing user or course" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
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
exports.getMyLearning = async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({
      user: userId,
    }).populate("course");

    // return full enrollment objects (recommended)
    res.status(200).json(enrollments);

  } catch (error) {
    console.error("MY LEARNING ERROR:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
