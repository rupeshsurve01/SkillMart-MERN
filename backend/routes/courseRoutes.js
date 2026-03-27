const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { authenticate, authorizeRoles } = require("../middleware/auth");

const {
  addCourse,
  getCourses,
  getSingleCourse,
  getSellerCourses,
  deleteCourse,
  updateCourse,
  getPublicCourses,
  getPendingCourses,
  updateCourseStatus,
  addReview
} = require("../controllers/courseController");

router.get("/public", getPublicCourses);
router.get("/", getCourses);


// Seller create course
router.post(
  "/",
  authenticate,
  upload.single("thumbnail"),
  addCourse
);

// Seller get own courses
router.get(
  "/seller",
  authenticate,
  getSellerCourses
);

router.get("/:id", getSingleCourse);

// Delete course
router.delete(
  "/:id",
  authenticate,
  deleteCourse
);

// Update course
router.put(
  "/:id",
  authenticate,
  upload.single("thumbnail"),
  updateCourse
);

// Add review
router.post(
  "/:id/review",
  authenticate,
  addReview
);

module.exports = router;