const Course = require("../models/Course");
const Wishlist = require("../models/Wishlist");

// ================= ADD TO WISHLIST =================
const addToWishlist = async (req, res) => {
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

    const exists = await Wishlist.findOne({
      user: userId,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    await Wishlist.create({
      user: userId,
      course: courseId,
    });

    res.status(200).json({ message: "Added to wishlist ❤️" });

  } catch (error) {
    console.error("WISHLIST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET WISHLIST =================
const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ user: userId })
      .populate("course");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// ================= REMOVE =================
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    await Wishlist.findOneAndDelete({
      user: userId,
      course: courseId,
    });

    res.status(200).json({ message: "Removed from wishlist ❌" });

  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};