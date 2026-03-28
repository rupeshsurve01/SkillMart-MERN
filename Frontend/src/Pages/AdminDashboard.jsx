import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // alert("Welcome to admin dashboard");
    const fetchPendingCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/pending`,
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
        `${import.meta.env.VITE_API_URL}/api/admin/course/${id}`,
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
    } catch {
      alert("Failed to update course status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Admin dashboard</p>
            <h1 className="text-4xl font-bold text-slate-900 mt-2">Pending Course Approvals</h1>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Review new course submissions, approve the best content, and keep SkillMart quality high for learners.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs uppercase text-slate-500 tracking-[0.2em]">Pending</p>
              <p className="text-3xl font-semibold text-slate-900">{courses.length}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-3xl bg-[#6f26eb] px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Refresh list
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center text-slate-500 shadow-sm">
            Loading pending courses...
          </div>
        ) : courses.length > 0 ? (
          <div className="grid gap-6 xl:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course._id}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    {course.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{course.title}</h2>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {course.description || "No description available."}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                      ₹{course.price}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Instructor</p>
                      <p className="text-sm font-medium text-slate-800 mt-1">{course.seller?.name || "Unknown"}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Level</p>
                      <p className="text-sm font-medium text-slate-800 mt-1">{course.level || "Beginner"}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(course._id, "approved");
                      }}
                      className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(course._id, "rejected");
                      }}
                      className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-400 hover:text-red-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => navigate(`/admin/${course._id}`)}
                      className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-500">All clear</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">No pending approvals</h2>
            <p className="mt-3 text-slate-600">Great work! There are currently no new course submissions waiting for review.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
