const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth");
const { getMyCourses,enrollCourse } = require("../controllers/enrollController");

// Protected route
router.get("/my", authenticate, getMyCourses);
router.post("/enroll", authenticate, enrollCourse);

module.exports = router;