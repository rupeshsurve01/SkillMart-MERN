/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseRegisterForm() {
  const [courseData, setCourseData] = useState({
    title: "",
    firm: "",
    shortDesc: "",
    category: "",
    level: "",
    language: "",
    syllabus: "",
    duration: "",
    learn: "",
    lectures: "",
    price: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!courseData.title.trim()) newErrors.title = "Course title is required";
    if (!courseData.firm.trim()) newErrors.firm = "Firm Name is required";
    if (!courseData.shortDesc.trim())
      newErrors.shortDesc = "Short description is required";
    if (!courseData.category) newErrors.category = "Select a category";
    if (!courseData.level) newErrors.level = "Select a level";
    if (!courseData.language) newErrors.language = "Select a language";
    if (!courseData.syllabus.trim())
      newErrors.syllabus = "Course syllabus is required";
    if (!courseData.duration.trim())
      newErrors.duration = "Duration is required";
    if (!courseData.learn.trim()) newErrors.learn = "This field is required";

    if (!courseData.lectures || courseData.lectures <= 0)
      newErrors.lectures = "Lectures must be greater than 0";

    if (!courseData.price || courseData.price <= 0)
      newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const token = localStorage.getItem("token");

  const formData = new FormData();

  Object.keys(courseData).forEach((key) => {
    if (key !== "thumbnail") {
      formData.append(key, courseData[key]);
    }
  });

  if (courseData.thumbnail) {
    formData.append("thumbnail", courseData.thumbnail);
  }

  try {
    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    navigate("/my-courses")
  } catch (error) {
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Course</h1>

        {/* BASIC INFO */}
        <label className="font-medium">Course Title</label>
        <input
          name="title"
          value={courseData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        />
        {errors.title && <p className="text-red-500 mb-2">{errors.title}</p>}

        <label className="font-medium">Firm Name</label>
        <input
          name="firm"
          value={courseData.firm}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        />
        {errors.firm && <p className="text-red-500 mb-2">{errors.firm}</p>}

        <label className="font-medium">Short Description</label>
        <input
          name="shortDesc"
          value={courseData.shortDesc}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        />
        {errors.shortDesc && <p className="text-red-500 mb-2">{errors.shortDesc}</p>}

        <label className="font-medium">Category</label>
        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        >
          <option value="">Select</option>
          <option value="web-development">Web Development</option>
          <option value="app-development">App Development</option>
          <option value="ai-ml">AI / ML</option>
          <option value="programming">Programming Language</option>
          <option value="testing">Testing</option>
          <option value="database">Database</option>
          <option value="security">Security</option>
          <option value="devOps">DevOps</option>
          <option value="theory">Theory Concepts</option>
        </select>
        {errors.category && <p className="text-red-500 mb-2">{errors.category}</p>}

        <label className="font-medium">Level</label>
        <select
          name="level"
          value={courseData.level}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        >
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.category && <p className="text-red-500 mb-2">{errors.category}</p>}

        {/* LANGUAGE DROPDOWN */}
        <label className="font-medium">Course Language</label>
        <select
          name="language"
          value={courseData.language}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-1"
        >
          <option value="">Select</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Hindi + English">Hindi + English</option>
        </select>
        {errors.language && <p className="text-red-500">{errors.language}</p>}

        {/* SYLLABUS */}
        <label className="font-medium mt-4 block">Course Syllabus</label>
        <textarea
          name="syllabus"
          value={courseData.syllabus}
          onChange={handleChange}
          placeholder="1. Introduction
                          2. Setup & Tools
                          3. Core Concepts
                          4. Project"
          className="w-full border px-3 py-2 rounded "
        />
        {errors.syllabus && <p className="text-red-500 mb-2">{errors.syllabus}</p>}

        {/* COURSE CONTENT */}
        <label className="font-medium">Total Duration</label>
        <input
          name="duration"
          value={courseData.duration}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        />
        {errors.duration && <p className="text-red-500 mb-2">{errors.duration}</p>}

        <label className="font-medium">What You Will Learn</label>
        <textarea
          name="learn"
          value={courseData.learn}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-1"
        />

        <label className="font-medium">Number of Lectures</label>
        <input
          type="number"
          name="lectures"
          value={courseData.lectures}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded "
        />
        {errors.lectures && <p className="text-red-500 mb-2">{errors.lectures}</p>}


        {/* PRICE */}
        <label className="font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        {errors.price && <p className="text-red-500 mb-2">{errors.price}</p>}

        {/* THUMBNAIL */}
        <label className="font-medium block mb-1">Course Thumbnail</label>

        <label
          htmlFor="thumbnail"
          className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg inline-block"
        >
          Upload Thumbnail
        </label>

        <input
          id="thumbnail"
          name="thumbnail" 
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            setCourseData({ ...courseData, thumbnail: file });
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-48 h-32 object-cover rounded-lg border"
          />
        )}

        <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg">
          Publish Course
        </button>
      </form>
    </div>
  );
}

export default CourseRegisterForm;
