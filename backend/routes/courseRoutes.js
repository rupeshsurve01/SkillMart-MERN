const express = require("express");
const isAdmin = require("../middleware/adminCheck");

const {
  addCourse,
  getCourses,
  getSingleCourse,
  getSellerCourses,
  deleteCourse,
  updateCourse,
  getPublicCourses,
  getAllCourses 
} = require("../controllers/courseController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("thumbnail"), addCourse);

router.get("/public", getPublicCourses);
router.get("/seller/:sellerId", getSellerCourses);
router.get("/", getCourses);
router.get("/all", getAllCourses);
router.get("/:id", getSingleCourse);

router.delete("/:id", deleteCourse);

router.put("/:id", upload.single("thumbnail"), updateCourse);


router.get("/admin/all", isAdmin, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

module.exports = router;
