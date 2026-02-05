const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const userId = req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(401).json({ message: "User ID missing" });
  }

  const user = await User.findById(userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }

  next();
};

module.exports = isAdmin;
