const express = require("express")
const router = express.Router()

const {
  enrollCourse,
  getMyLearning,
} = require("../controllers/enrollController");

router.post("/", enrollCourse)
router.get("/my/:userId", getMyLearning)

module.exports = router;