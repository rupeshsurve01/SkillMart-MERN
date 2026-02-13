import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewForAdmin = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

   const navigate = useNavigate()
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/admin/pending?userId=${userId}`).then(
      async (res) => {
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Access denied");
          setCourses([]); // 👈 IMPORTANT
          return;
        }

        setCourses(data); // only array reaches here
      },
    );
  }, [userId]);

  if (!course) return <p>Loading...</p>;

const handleDelete = async (courseId) => {
  const sellerId = localStorage.getItem("userId");

  if (!window.confirm("Delete this course?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sellerId }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      navigate("/admin");
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    alert("Delete failed");
  }
};


  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/admin/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userId }),
    });

    const data = await res.json();
    alert(data.message);

    setCourses(courses.filter((c) => c._id !== id));
  };
  return (
    <>
   
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* COURSE THUMBNAIL */}
        <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg mb-10">
          <img
            src={`http://localhost:5000/uploads/${course.thumbnail}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {course.title}
            </h1>

            <p className="text-lg text-gray-600">{course.shortDesc}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {course.category}
              </span>

              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {course.level} Level
              </span>

              <span className="px-4 py-1 bg-red-300 text-black-700 rounded-full text-sm font-semibold">
                {course.language}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">📚 Course Syllabus</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {course.syllabus}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
              <p>
                🕒 <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                🎥 <strong>Lectures:</strong> {course.lectures}
              </p>
              <p>
                🏢 <strong>Institute:</strong> {course.firm}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24">
            <p className="text-3xl font-extrabold text-gray-900 mb-4">
              ₹ {course.price}
            </p>

            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>✔ Full lifetime access</p>
              <p>✔ Learn at your own pace</p>
              <p>✔ Certificate of completion</p>
            </div>
          </div>
        </div>
        <div className="pt-15 flex gap-10">

        <button
          onClick={() => updateStatus(course._id, "rejected")}
          className="bg-red-600 text-white px-24 py-2 rounded-lg"
          >
          Reject
        </button>
        <button
          onClick={() => updateStatus(course._id, "approved")}
          className="bg-green-600 text-white px-24 py-2 rounded-lg"
          >
          Approve
        </button>
                    {role === "admin" && (
              <button
                onClick={() => handleDelete(course._id)}
                className="w-full bg-red-600 text-white py-2 rounded-xl mt-3"
              >
                Admin Delete Course
              </button>
            )}
            </div>
      </div>
    </>
  );
};
export default ViewForAdmin;
