import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/enroll/my/${userId}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Learning</h1>

        {courses.length === 0 ? (
          <p>No enrolled courses yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow p-4"
              >
                <img
                  src={`http://localhost:5000/uploads/${course.thumbnail}`}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-lg"
                />

                <h2 className="font-bold mt-3">{course.title}</h2>
                <p className="text-gray-600 text-sm">
                  {course.shortDesc}
                </p>

                <p className="mt-2 font-semibold">
                  ₹ {course.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyLearning;
