const express = require("express");
const router = express.Router();

const {
  getPendingCourses,
  updateCourseStatus,
} = require("../controllers/adminCheck");

const { authenticate, authorizeRoles } = require("../middleware/auth");

// GET ALL PENDING COURSES
router.get(
  "/pending",
  authenticate,
  authorizeRoles("admin"),
  getPendingCourses
);

// APPROVE / REJECT COURSE
router.put(
  "/course/:id",
  authenticate,
  authorizeRoles("admin"),
  updateCourseStatus
);

module.exports = router;