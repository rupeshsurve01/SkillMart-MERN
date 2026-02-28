import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

const token = localStorage.getItem("token");

useEffect(() => {
  console.log("TOKEN:", token);
  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/enroll/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      const validCourses = Array.isArray(data)
        ? data.filter((item) => item && item.course)
        : [];

      setCourses(validCourses);
    } catch (error) {
      console.error("Failed to load enrolled courses:", error);
    }
  };

  fetchCourses();
}, [token, navigate]);

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
                      ? `${import.meta.env.VITE_API_URL}/uploads/${item.course.thumbnail}`
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
