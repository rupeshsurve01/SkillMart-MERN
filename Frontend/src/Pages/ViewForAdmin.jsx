import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewForAdmin = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Fetch Single Pending Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourse(res.data);
      } catch (error) {
        alert("Unauthorized or course not found");
        navigate("/");
      }
    };

    fetchCourse();
  }, [id, token, navigate]);

  // 🔹 Approve / Reject
  const updateStatus = async (status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/course/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      navigate("/admin");
    } catch (error) {
      alert("Action failed");
    }
  };

  if (!course) return <p className="text-center mt-20">Loading...</p>;

  return (
   <>
  <Navbar />

  <div className="max-w-7xl mx-auto px-4 py-10">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-2 space-y-6">

        {/* Thumbnail */}
        <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow-xl">
          <img
            src={course.thumbnail || "/placeholder.png"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {course.title}
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            {course.shortDesc}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {course.category}
          </span>

          <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            {course.level}
          </span>

          <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            {course.language}
          </span>

          <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            {course.status?.toUpperCase()}
          </span>
        </div>

        {/* Syllabus */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">📚 Course Syllabus</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {course.syllabus}
          </p>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-md">
          <div>
            <p className="text-gray-500 text-sm">Duration</p>
            <p className="font-semibold">{course.duration}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Lectures</p>
            <p className="font-semibold">{course.lectures}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Institute</p>
            <p className="font-semibold">{course.firm}</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24 space-y-6">

        <div>
          <p className="text-gray-500 text-sm">Course Price</p>
          <p className="text-3xl font-bold text-gray-900">
            ₹ {course.price}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reject this course?")) {
                updateStatus("rejected");
              }
            }}
            className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Reject Course
          </button>

          <button
            onClick={() => {
              if (window.confirm("Approve this course?")) {
                updateStatus("approved");
              }
            }}
            className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
          >
            Approve Course
          </button>

        </div>

      </div>

    </div>
  </div>
</>
  );
};

export default ViewForAdmin;