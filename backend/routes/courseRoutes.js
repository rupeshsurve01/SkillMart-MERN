const express = require("express");

const {
  addCourse,
  getCourses,
  getSingleCourse,
  getSellerCourses,
  deleteCourse,
  updateCourse,
  getPublicCourses
} = require("../controllers/courseController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("thumbnail"), addCourse);

router.get("/public", getPublicCourses);

// ✅ FIX: seller route must come BEFORE /:id
router.get("/seller/:sellerId", getSellerCourses);

router.get("/", getCourses);

router.get("/:id", getSingleCourse);

router.delete("/:id", deleteCourse);

router.put("/:id", upload.single("thumbnail"), updateCourse);

module.exports = router;
