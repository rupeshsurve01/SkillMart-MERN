const Enrollment = require("../models/Enrollment");

// ENROLL COURSE
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // prevent duplicate enroll
    const alreadyEnrolled = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// GET MY LEARNING
exports.getMyLearning = async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({ userId }).populate(
      "courseId"
    );

    const courses = enrollments.map((e) => e.courseId);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
