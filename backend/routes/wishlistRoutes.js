const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require("../controllers/wishlistController");

router.post("/", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/", removeFromWishlist)
module.exports = router;
