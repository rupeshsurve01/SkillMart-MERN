import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/courses/seller", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch(() => setCourses([]));
  }, [token, navigate]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;

    const res = await fetch(
      `http://localhost:5000/api/courses/${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setCourses((prev) =>
        prev.filter((c) => c._id !== courseId)
      );
    }
  };

  // 📊 Stats
  const approved = courses.filter((c) => c.status === "approved").length;
  const pending = courses.filter((c) => c.status === "pending").length;
  const rejected = courses.filter((c) => c.status === "rejected").length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              My Courses
            </h1>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-10 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              + Add New Course
            </Link>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Total Courses</p>
              <h2 className="text-2xl font-bold">{courses.length}</h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Approved</p>
              <h2 className="text-2xl font-bold text-green-600">{approved}</h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Pending / Rejected</p>
              <h2 className="text-2xl font-bold text-yellow-600">
                {pending + rejected}
              </h2>
            </div>
          </div>

          {/* COURSE GRID */}
          {courses.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold mb-3">
                You haven’t created any courses yet
              </h2>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 flex flex-col"
                >
                  <img
                    src={
                      course.thumbnail
                        ? `http://localhost:5000/uploads/${course.thumbnail}`
                        : "/placeholder.png"
                    }
                    alt={course.title}
                    className="h-40 w-full object-cover rounded-lg"
                  />

                  <div className="flex justify-between items-center mt-4">
                    <h2 className="font-bold text-lg line-clamp-1">
                      {course.title}
                    </h2>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        course.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : course.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {course.shortDesc}
                  </p>

                  <p className="mt-3 font-semibold text-lg">
                    ₹ {course.price}
                  </p>

                  <div className="flex gap-2 mt-auto pt-4">
                    <Link
                      to={`/view/${course._id}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit/${course._id}`}
                      className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCourses;