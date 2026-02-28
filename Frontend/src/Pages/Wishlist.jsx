import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ JWT
            },
          }
        );

        const data = await res.json();

        const validCourses = Array.isArray(data)
          ? data.filter((item) => item && item.course)
          : [];

        setCourses(validCourses);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
        setCourses([]);
      }
    };

    fetchWishlist();
  }, [token, navigate]);

  const handleRemove = async (courseId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ JWT
          },
          body: JSON.stringify({ courseId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setCourses((prev) =>
        prev.filter((c) => c.course._id !== courseId)
      );

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {courses.length === 0 ? (
          <p className="text-gray-600">Your Wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() =>
                  navigate(`/view/${item.course._id}`)
                }
              >
                <img
                  src={
                    item.course.thumbnail
                      ? `${import.meta.env.VITE_API_URL}/uploads/${item.course.thumbnail}`
                      : "/placeholder.png"
                  }
                  alt={item.course.title}
                  className="h-40 w-full object-cover rounded-lg"
                />

                <h2 className="font-bold mt-3">
                  {item.course.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {item.course.shortDesc}
                </p>

                <p className="mt-2 font-semibold">
                  ₹ {item.course.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.course._id);
                  }}
                  className="mt-3 w-full bg-gray-400 text-black py-2 rounded-lg hover:bg-gray-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
