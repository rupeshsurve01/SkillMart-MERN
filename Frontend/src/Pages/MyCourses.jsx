import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const sellerId = localStorage.getItem("userId");

useEffect(() => {
  if (!sellerId) return;

  fetch(`http://localhost:5000/api/courses/seller/${sellerId}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error("API did not return array:", data);
        setCourses([]); // prevent crash
      }
    })
    .catch(() => setCourses([]));
}, [sellerId]);


  const handleDelete = async (courseId) => {
    const sellerId = localStorage.getItem("userId");

    if (!window.confirm("Are you sure you want to delete this course?")) return;

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
      setCourses(courses.filter((c) => c._id !== courseId));
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-8xl h-screen mx-auto px-4 py-10 bg-gray-300">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>

        {courses.length === 0 ? (
          <p>You haven’t published any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={`http://localhost:5000/uploads/${course.thumbnail}`}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-lg"
                />

                <h2 className="font-bold mt-3">{course.title}</h2>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full
                ${
                  course.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : course.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
               >
                  {course.status.toUpperCase()}
                </span>

                <p className="text-gray-600 text-sm">{course.shortDesc}</p>

                <p className="mt-2 font-semibold">₹ {course.price}</p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/view/${course._id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/edit/${course._id}`}
                    className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;
