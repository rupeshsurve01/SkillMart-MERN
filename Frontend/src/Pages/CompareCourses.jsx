import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompareCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("compareCourses")) || [];

    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        const responses = await Promise.all(
          ids.map((id) => axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${id}`))
        );

        setCourses(responses.map((res) => res.data));
      } catch (error) {
        console.error("Failed to load compare courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const clearComparison = () => {
    localStorage.removeItem("compareCourses");
    setCourses([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-2xl">
            <div className="h-10 w-1/3 rounded-full bg-slate-800" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((key) => (
                <div key={key} className="rounded-[28px] bg-slate-900 p-6">
                  <div className="h-44 rounded-3xl bg-slate-800" />
                  <div className="mt-5 space-y-3">
                    <div className="h-5 w-3/4 rounded-full bg-slate-800" />
                    <div className="h-4 w-1/2 rounded-full bg-slate-800" />
                    <div className="h-4 w-full rounded-full bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <>
        <Navbar />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Course comparison</p>
            <h1 className="text-4xl font-bold">Nothing to compare yet</h1>
            <p className="text-slate-300 leading-7">
              Select a few courses from the catalog and come back here to compare price, duration, level, and more.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[#6f26eb] px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Browse courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-950 text-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Compare options</p>
              <h1 className="mt-4 text-4xl font-bold text-white">Course comparison</h1>
              <p className="mt-3 max-w-2xl text-slate-300 leading-7">
                Review the best course options side by side and choose the one that fits your learning goals.
              </p>
            </div>
            <button
              onClick={clearComparison}
              className="inline-flex items-center justify-center rounded-3xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Clear comparison
            </button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article key={course._id} className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-44 overflow-hidden rounded-3xl bg-slate-800">
                  <img
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="mt-5 space-y-3 text-left">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{course.category || "Uncategorized"}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white line-clamp-2">{course.title}</h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
                      <p className="mt-2 text-lg font-semibold text-white">₹{course.price || "Free"}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Level</p>
                      <p className="mt-2 text-lg font-semibold text-white">{course.level || "All Levels"}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="overflow-x-auto rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
          <table className="min-w-full text-left text-sm text-slate-100">
            <thead className="bg-slate-900/90 text-slate-300">
              <tr>
                <th className="sticky left-0 z-20 bg-slate-900/90 border-r border-white/10 p-4 text-left font-semibold">Feature</th>
                {courses.map((course) => (
                  <th key={course._id} className="border border-white/10 p-4 text-left font-semibold">
                    {course.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Instructor", (c) => c.seller?.name || "Unknown"],
                ["Price", (c) => `₹ ${c.price || "Free"}`],
                ["Level", (c) => c.level || "All Levels"],
                ["Duration", (c) => c.duration || "N/A"],
                ["Lectures", (c) => c.lectures || "N/A"],
                ["Language", (c) => c.language || "English"],
                ["Institute", (c) => c.firm || "-"],
              ].map(([label, value], index) => (
                <tr key={label} className={index % 2 === 0 ? "bg-slate-900/80" : "bg-slate-950/80"}>
                  <td className="sticky left-0 z-10 border-r border-white/10 p-4 font-semibold text-slate-200">{label}</td>
                  {courses.map((course) => (
                    <td key={course._id} className="border border-white/10 p-4 text-slate-300">
                      {value(course)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default CompareCourses;
