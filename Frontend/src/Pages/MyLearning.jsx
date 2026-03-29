import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useToast } from "../components/ToastContext";

const API_URL = import.meta.env.VITE_API_URL;

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      showToast("Please login first", "error");
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
          showToast("Session expired. Please login again.", "error");
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
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, navigate, showToast]);

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

  const totalSpent = courses.reduce(
    (sum, item) => sum + Number(item.course.price || 0),
    0
  );

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-slate-950 text-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Learning center</p>
              <h1 className="mt-4 text-4xl font-bold text-white">My Learning</h1>
              <p className="mt-3 max-w-2xl text-slate-300 leading-7">
                Access all your enrolled courses from one place. Continue learning, revisit lessons, and manage your progress.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/80 p-5 shadow-lg border border-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">In progress</p>
                <p className="mt-3 text-3xl font-semibold text-white">{courses.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5 shadow-lg border border-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total spent</p>
                <p className="mt-3 text-3xl font-semibold text-white">₹{totalSpent}</p>
              </div>
              <Link
                to="/allcourses"
                className="inline-flex items-center justify-center rounded-3xl bg-[#6f26eb] px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Discover more
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-[28px] border border-white/10 bg-slate-900/80 p-6"
                >
                  <div className="h-44 w-full rounded-3xl bg-slate-800" />
                  <div className="mt-5 space-y-3">
                    <div className="h-5 w-3/4 rounded-full bg-slate-800" />
                    <div className="h-4 w-1/2 rounded-full bg-slate-800" />
                    <div className="h-4 w-full rounded-full bg-slate-800" />
                    <div className="h-10 rounded-full bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/15 bg-slate-900/70 p-14 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">No learning started</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">You haven’t enrolled in any course yet</h2>
              <p className="mt-3 text-slate-300">Pick a course and start learning today.</p>
              <Link
                to="/allcourses"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6f26eb] px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Browse courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((item) => (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  onClick={() => navigate(`/view/${item.course._id}`)}
                >
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img
                      src={item.course.thumbnail || "/placeholder.png"}
                      alt={item.course.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                      {item.course.level || "All levels"}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white line-clamp-2">{item.course.title}</h2>
                      <p className="mt-3 text-sm text-slate-300 line-clamp-3">{item.course.shortDesc || "No preview available."}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                      <span>₹{item.course.price || "Free"}</span>
                      <span>{item.course.category || "Uncategorized"}</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-[#6f26eb] px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                      >
                        Resume
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item.course._id);
                        }}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
    </div>
  );
};

export default MyLearning;
