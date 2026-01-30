const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const { seller } = req.body;

    if (!seller) {
      return res.status(400).json({ message: "Seller is required" });
    }

    const course = await Course.create({
      ...req.body,
      seller: seller, // ✅ CORRECT
      thumbnail: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Course added",
      course,
    });

  } catch (error) {
    console.error("ADD COURSE ERROR:", error);
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

exports.getSellerCourses = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const courses = await Course.find({ seller: sellerId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller courses" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const { sellerId } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ownership check
    if (course.seller.toString() !== sellerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



