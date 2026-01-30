const express = require("express");
const { addCourse, getCourses } = require("../controllers/courseController");
const upload = require("../middleware/upload");
const { getSingleCourse } = require("../controllers/courseController");
const { getSellerCourses } = require("../controllers/courseController");

const router = express.Router();

router.post("/", upload.single("thumbnail"), addCourse);
router.get("/", getCourses);
router.get("/:id", getSingleCourse);
router.get("/seller/:sellerId", getSellerCourses);

module.exports = router;
