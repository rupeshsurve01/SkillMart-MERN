/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

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

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!courseData.title.trim()) newErrors.title = "Course title is required";
    if (!courseData.firm.trim()) newErrors.firm = "Firm name is required";
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

    if (!courseData.lectures || Number(courseData.lectures) <= 0)
      newErrors.lectures = "Lectures must be greater than 0";

    if (!courseData.price || Number(courseData.price) <= 0)
      newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      showToast(data.message || "Course submission failed", res.ok ? "success" : "error");
      if (res.ok) navigate("/my-courses");
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-[32px] bg-white shadow-2xl border border-slate-200 p-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">Add New Course</h1>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">Course Title</label>
            <input
              name="title"
              value={courseData.title}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">Firm Name</label>
            <input
              name="firm"
              value={courseData.firm}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
            />
            {errors.firm && <p className="text-sm text-red-500">{errors.firm}</p>}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">Short Description</label>
            <input
              name="shortDesc"
              value={courseData.shortDesc}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
            />
            {errors.shortDesc && <p className="text-sm text-red-500">{errors.shortDesc}</p>}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
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
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Level</label>
              <select
                name="level"
                value={courseData.level}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              >
                <option value="">Select</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Course Language</label>
              <select
                name="language"
                value={courseData.language}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              >
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Hindi + English">Hindi + English</option>
              </select>
              {errors.language && <p className="text-sm text-red-500">{errors.language}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">Course Syllabus</label>
            <textarea
              name="syllabus"
              value={courseData.syllabus}
              onChange={handleChange}
              placeholder="1. Introduction\n2. Setup & Tools\n3. Core Concepts\n4. Project"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb] min-h-[140px]"
            />
            {errors.syllabus && <p className="text-sm text-red-500">{errors.syllabus}</p>}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">What Learners Will Learn</label>
            <textarea
              name="learn"
              value={courseData.learn}
              onChange={handleChange}
              placeholder="Describe the key outcomes learners will gain from this course"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb] min-h-[120px]"
            />
            {errors.learn && <p className="text-sm text-red-500">{errors.learn}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Total Duration</label>
              <input
                name="duration"
                value={courseData.duration}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Number of Lectures</label>
              <input
                type="number"
                name="lectures"
                value={courseData.lectures}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              />
              {errors.lectures && <p className="text-sm text-red-500">{errors.lectures}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Price</label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Course Thumbnail</label>
              <label
                htmlFor="thumbnail"
                className="cursor-pointer rounded-3xl border border-slate-300 bg-slate-100 px-4 py-3 text-center text-slate-700 hover:bg-slate-200 transition"
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
            </div>
          </div>

          {preview && (
            <div className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-sm font-medium text-slate-700">Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full max-w-sm h-48 object-cover rounded-3xl border border-slate-200"
              />
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-[#6f26eb] py-3 text-white font-semibold transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseRegisterForm;
