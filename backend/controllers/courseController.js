const Course =  require("../models/Course")
const User = require("../models/User");


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
      seller: seller,
      status: "pending",
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
  try {
    const courses = await Course.find({ status: "approved" });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
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
    const { id } = req.params;
    const { sellerId } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(sellerId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ FIRST check admin
    if (user.role === "admin") {
      await Course.findByIdAndDelete(id);
      return res.status(200).json({ message: "Course deleted by admin" });
    }

    // ✅ THEN check seller ownership
    if (course.seller.toString() !== sellerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.seller.toString() !== sellerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedData = { ...req.body };
    delete updatedData.sellerId;

    if (req.file) {
      updatedData.thumbnail = req.file.filename;
    }

    await Course.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: get pending courses
exports.getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "pending" })
      .populate("seller", "name email");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending courses" });
  }
};

// ADMIN: approve / reject course
exports.updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await Course.findByIdAndUpdate(id, { status });

    res.status(200).json({ message: `Course ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course status" });
  }
};


exports.getPublicCourses = async (req, res) => {
  try {
    console.log("COURSE MODEL 👉", Course);

    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("🔥 REAL ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("GET ALL COURSES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
