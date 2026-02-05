import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/admin/pending?userId=${userId}`
        );

        const data = await res.json();
        console.log("ADMIN API DATA:", data);
        console.log("ADMIN userId from localStorage:", userId);


        if (!res.ok) {
          alert(data.message || "Access denied");
          setCourses([]);
        } else {
          setCourses(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Admin fetch error:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, [userId]);

  useEffect(() => {
  if (localStorage.getItem("role") !== "admin") {
    alert("Access denied");
    navigate("/");
  }
}, []);

  // APPROVE / REJECT COURSE
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/course/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, userId }),
        }
      );

      const data = await res.json();
      alert(data.message);

      // Remove course from list after action
      setCourses((prev) => prev.filter((c) => c._id !== id));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to update course status");
    }
  };

  return (
    <div className="bg-gray-300 h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* LOADING STATE */}
        {loading ? (
          <p className="text-gray-600">Loading pending courses...</p>
        ) : Array.isArray(courses) && courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/admin/${course._id}`)}
                className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-6 cursor-pointer bg-amber-500 hover:bg-amber-400"
              >
                {/* LEFT: THUMBNAIL */}
                <div className="w-20 h-20 rounded-full overflow-hidden border flex-shrink-0">
                  <img
                    src={`http://localhost:5000/uploads/${course.thumbnail}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* MIDDLE: INFO */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-600">
                    Seller:{" "}
                    <span className="font-medium">
                      {course.seller?.name}
                    </span>
                  </p>

                  <div className="text-xs text-gray-500 mt-1 flex gap-3">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                    <span>•</span>
                    <span>₹ {course.price}</span>
                  </div>
                </div>

                {/* RIGHT: ACTIONS */}
                <div className="flex gap-2">

                  <button
                    onClick={() => updateStatus(course._id, "approved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-sm font-extrabold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(course._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-sm font-extrabold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No pending courses 🎉</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
