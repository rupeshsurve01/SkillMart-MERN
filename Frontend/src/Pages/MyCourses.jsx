import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const sellerId = localStorage.getItem("userId");

  useEffect(() => {
    if (!sellerId) return;

    fetch(`http://localhost:5000/api/courses/seller/${sellerId}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
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

      <div className="max-w-6xl mx-auto px-4 py-10">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;
