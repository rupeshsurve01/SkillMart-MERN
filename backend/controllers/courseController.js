const mongoose = require("mongoose");
const Course =  require("../models/Course")
const User = require("../models/User");

exports.addCourse = async (req, res) => {
  try {
    const sellerId = req.user._id; // from JWT

    const course = await Course.create({
      ...req.body,
      seller: sellerId,
      thumbnail : req.file.path ,
      cloudinary_id: req.file.filename,// Cloudinary URL
      status: "pending",
    });
    
    res.status(201).json({
      message: "Course added",
      course,
    });
  } catch (error) {
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

exports. getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);

  } catch (error) {
    console.error("GET SINGLE COURSE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Admin can delete any course
    if (userRole === "admin") {
      await Course.findByIdAndDelete(id);
       // Delete image from Cloudinary
    await cloudinary.uploader.destroy(course.cloudinary_id);
      return res.status(200).json({ message: "Course deleted by admin" });
    }

    // Seller can delete only their course
    if (course.seller.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Course.findByIdAndDelete(id);
     // Delete image from Cloudinary
    await cloudinary.uploader.destroy(course.cloudinary_id);
    res.status(200).json({ message: "Course deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.seller.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.thumbnail = req.file.filename;
    }

    await Course.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Course updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "pending" })
      .populate("seller", "name email");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending courses" });
  }
};

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

exports.getSellerCourses = async (req, res) => {
  try {
    const sellerId = req.user._id; // from JWT

    const courses = await Course.find({ seller: sellerId });

    res.status(200).json(courses);
  } catch (error) {
    console.error("GET SELLER COURSES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch seller courses" });
  }
};