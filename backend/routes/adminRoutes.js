const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/adminCheck");
const {
  getPendingCourses,
  updateCourseStatus,
} = require("../controllers/courseController");

router.get("/pending", isAdmin, getPendingCourses);
router.put("/course/:id", isAdmin, updateCourseStatus);

module.exports = router;
