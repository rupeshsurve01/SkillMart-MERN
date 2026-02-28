import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // FETCH PENDING COURSES
  useEffect(() => {
    // alert("Welcome to admin dashboard");
    const fetchPendingCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/pending",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Access denied");
          navigate("/");
        } else {
          
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching pending courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, [token, navigate]);

  // APPROVE / REJECT
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/course/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      alert(data.message);

      // Remove from UI after update
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to update course status");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">
            Pending Course Approvals
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/admin/${course._id}`)}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-6 hover:shadow-lg cursor-pointer transition"
                >
                  {/* THUMBNAIL */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border flex-shrink-0">
                    <img
                      src={`http://localhost:5000/uploads/${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {course.title}
                    </h2>

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

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(course._id, "approved");
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold"
                    >
                      Approve
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(course._id, "rejected");
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending courses 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;