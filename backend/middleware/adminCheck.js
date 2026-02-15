const User = require("../models/User");
const mongoose = require("mongoose");

const isAdmin = async (req, res, next) => {
  try {
    
const userId = req.query.userId || req.body.userId;

    console.log("ADMIN CHECK userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "UserId missing" });
    }

    // validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId);

    console.log("ADMIN USER FOUND:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  } catch (error) {
    console.error("ADMIN CHECK ERROR:", error);
    return res.status(500).json({ message: "Admin check failed" });
  }
};

module.exports = isAdmin;
