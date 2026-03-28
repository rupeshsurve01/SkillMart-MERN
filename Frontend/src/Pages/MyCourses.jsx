import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/courses/seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    }
  };

  // 📊 Stats
  const approved = courses.filter((c) => c.status === "approved").length;
  const pending = courses.filter((c) => c.status === "pending").length;
  const rejected = courses.filter((c) => c.status === "rejected").length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
        <div className="max-w-7xl mx-auto space-y-8">
          <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-8 shadow-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Instructor dashboard</p>
                <h1 className="mt-4 text-4xl font-bold text-slate-900">My Courses</h1>
                <p className="mt-3 text-slate-600 leading-7">
                  Manage your published and pending courses in one place. Track approval status, update course details, and keep your learners engaged.
                </p>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-3xl bg-[#6f26eb] px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                + Add New Course
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total courses</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{courses.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Approved</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-600">{approved}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Pending</p>
                <p className="mt-4 text-3xl font-semibold text-amber-600">{pending}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Rejected</p>
                <p className="mt-4 text-3xl font-semibold text-rose-600">{rejected}</p>
              </div>
            </div>
          </section>

          <section>
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-44 w-full rounded-2xl bg-slate-200" />
                    <div className="mt-5 space-y-3">
                      <div className="h-5 w-3/4 rounded-full bg-slate-200" />
                      <div className="h-4 w-1/2 rounded-full bg-slate-200" />
                      <div className="h-4 w-full rounded-full bg-slate-200" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-10 flex-1 rounded-full bg-slate-200" />
                        <div className="h-10 flex-1 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-500">No courses yet</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">Start building your first course</h2>
                <p className="mt-3 text-slate-600">Create content, publish fast, and let learners discover your expertise.</p>
                <Link
                  to="/register"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6f26eb] px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Create course
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <article key={course._id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={course.thumbnail || "/placeholder.png"}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 backdrop-blur-sm">
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                          {course.category || "Uncategorized"}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : course.status === "rejected"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900 line-clamp-2">{course.title}</h2>
                        <p className="mt-3 text-sm text-slate-600 line-clamp-3">{course.shortDesc || "No short description provided."}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Level</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{course.level || "All Levels"}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">₹{course.price || "Free"}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                          to={`/view/${course._id}`}
                          className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                          View course
                        </Link>
                        <Link
                          to={`/edit/${course._id}`}
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                        >
                          Edit course
                        </Link>
                      </div>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                      >
                        Delete course
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCourses;
