const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  enrollCourse,
  getMyCourses,
  checkEnrollment,
  removeEnrollment
} = require("../controllers/enrollController");

// Enroll in course
router.post("/", authenticate, enrollCourse);

// Get my learning
router.get("/my", authenticate, getMyCourses);

// Check enrollment status
router.get("/check/:courseId", authenticate, checkEnrollment);

// Remove enrolled course
router.delete("/", authenticate, removeEnrollment);

module.exports = router;
