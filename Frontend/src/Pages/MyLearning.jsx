import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/enroll/my`, {
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
        setCourses([]);
      }
    };

    fetchCourses();
  }, [token, navigate]);

  const handleRemove = async (courseId) => {
    try {
      const res = await fetch(`${API_URL}/api/enroll`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to remove course");
        return;
      }

      setCourses((prev) => prev.filter((item) => item.course._id !== courseId));
    } catch {
      alert("Server error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-300 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">My Learning</h1>

          {courses.length === 0 ? (
            <p className="text-gray-600">No enrolled courses yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/view/${item.course._id}`)}
                >
                  <img
                    src={item.course.thumbnail || "/placeholder.png"}
                    alt={item.course.title}
                    className="h-40 w-full object-cover rounded-lg"
                  />

                  <h2 className="font-bold mt-3">{item.course.title}</h2>

                  <p className="text-gray-600 text-sm">{item.course.shortDesc}</p>

                  <p className="mt-2 font-semibold">Rs. {item.course.price}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.course._id);
                    }}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove Course
                  </button>
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
