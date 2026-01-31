import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
 const userId = localStorage.getItem("userId");
 const navigate = useNavigate()

useEffect(() => {
  fetch(`http://localhost:5000/api/admin/pending?userId=${userId}`)
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Access denied");
        setCourses([]); // 👈 IMPORTANT
        return;
      }

      setCourses(data); // only array reaches here
    });
}, [userId]);


  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/admin/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userId }),
    });

    const data = await res.json();
    alert(data.message);

    setCourses(courses.filter((c) => c._id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {courses.length === 0 ? (
          <p>No pending courses 🎉</p>
        ) : (
          <div className="space-y-4">
            {Array.isArray(courses) && courses.map((course) => (
              <div
  key={course._id}
  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-6"
>
  {/* LEFT: ROUND THUMBNAIL */}
  <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border">
    <img
      src={`http://localhost:5000/uploads/${course.thumbnail}`}
      alt={course.title}
      className="w-full h-full object-cover"
    />
  </div>

  {/* MIDDLE: COURSE INFO */}
  <div className="flex-1">
    <h2 className="text-lg font-semibold">{course.title}</h2>
    <p className="text-sm text-gray-600">
      Seller: <span className="font-medium">{course.seller?.name}</span>
    </p>

    <div className="text-xs text-gray-500 mt-1 flex gap-3">
      <span>{course.category}</span>
      <span>•</span>
      <span>{course.level}</span>
      <span>•</span>
      <span>₹ {course.price}</span>
    </div>
  </div>

  {/* RIGHT: ACTION BUTTONS */}
  <div className="flex gap-2">
    <button
      onClick={() => navigate(`/admin/${course._id}`)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      View
    </button>

    <button
      onClick={() => updateStatus(course._id, "approved")}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Approve
    </button>

    <button
      onClick={() => updateStatus(course._id, "rejected")}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Reject
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

export default AdminDashboard;
