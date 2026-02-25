const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Protected routes
router.post("/", authenticate, addToWishlist);
router.get("/", authenticate, getWishlist);
router.delete("/", authenticate, removeFromWishlist);

module.exports = router;