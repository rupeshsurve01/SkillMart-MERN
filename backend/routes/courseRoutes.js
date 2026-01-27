const express = require("express");
const { addCourse, getCourses } = require("../controllers/courseController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("thumbnail"), addCourse);
router.get("/", getCourses);

module.exports = router;
