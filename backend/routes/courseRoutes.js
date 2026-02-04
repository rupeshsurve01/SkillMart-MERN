const express = require("express");
const { addCourse, getCourses } = require("../controllers/courseController");
const upload = require("../middleware/upload");
const { getSingleCourse } = require("../controllers/courseController");
const { getSellerCourses } = require("../controllers/courseController");
const { deleteCourse } = require("../controllers/courseController");
const { updateCourse } = require("../controllers/courseController");
const { getPublicCourses } = require("../controllers/courseController");

const router = express.Router();

router.post("/", upload.single("thumbnail"), addCourse);
router.get("/", getCourses);
router.get("/:id", getSingleCourse);
router.get("/seller/:sellerId", getSellerCourses);

router.delete("/:id", deleteCourse);


router.put("/:id", upload.single("thumbnail"), updateCourse);

router.get("/public", getPublicCourses)


module.exports = router;
