import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/enroll/my/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // 🛡️ SAFETY FILTER
        const validCourses = Array.isArray(data)
          ? data.filter((item) => item && item.course)
          : [];

        setCourses(validCourses);
      })
      .catch((err) => {
        console.error("Failed to load enrolled courses:", err);
        setCourses([]);
      });
  }, [userId]);

  return (
    <div>
      <Navbar />
    <div className="bg-gray-300 h-screen">

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Learning</h1>

        {courses.length === 0 ? (
          <p className="text-gray-600">
            No enrolled courses yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/view/${item.course._id}`)}
              >
                {/* IMAGE */}
                <img
                  src={
                    item.course.thumbnail
                      ? `http://localhost:5000/uploads/${item.course.thumbnail}`
                      : "/placeholder.png"
                  }
                  alt={item.course.title}
                  className="h-40 w-full object-cover rounded-lg"
                />

                {/* CONTENT */}
                <h2 className="font-bold mt-3">
                  {item.course.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {item.course.shortDesc}
                </p>

                <p className="mt-2 font-semibold">
                  ₹ {item.course.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default MyLearning;
