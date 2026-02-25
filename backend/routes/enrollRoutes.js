const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  enrollCourse,
  getMyCourses,
} = require("../controllers/enrollController");

// Enroll in course
router.post("/", authenticate, enrollCourse);

// Get my learning
router.get("/my", authenticate, getMyCourses);

module.exports = router;