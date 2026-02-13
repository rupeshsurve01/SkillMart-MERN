import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckCourses = () => {
  const navigate = useNavigate();

  // DATA STATES
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [search, setSearch] = useState("");

  // ADMIN MENU STATE
  const [activeMenu, setActiveMenu] = useState(null);

  // TOAST
  const [toast, setToast] = useState("");

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // FETCH COURSES
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/courses");
        setAllCourses(res.data);
        setFilteredCourses(res.data);
      } catch (error) {
        console.error("Failed to load courses:", error.message);
        setAllCourses([]);
        setFilteredCourses([]);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let updatedCourses = [...allCourses];

    if (search.trim() !== "") {
      const searchText = search.toLowerCase();
      updatedCourses = updatedCourses.filter(
        (course) =>
          (course.title || "").toLowerCase().includes(searchText) ||
          (course.firm || "").toLowerCase().includes(searchText) ||
          (course.category || "").toLowerCase().includes(searchText)
      );
    }

    if (category !== "all") {
      updatedCourses = updatedCourses.filter(
        (course) => course.category === category
      );
    }

    if (price !== "all") {
      if (price === "low") {
        updatedCourses = updatedCourses.filter(
          (course) => Number(course.price) <= 500
        );
      } else if (price === "medium") {
        updatedCourses = updatedCourses.filter(
          (course) =>
            Number(course.price) > 500 && Number(course.price) <= 2000
        );
      } else if (price === "high") {
        updatedCourses = updatedCourses.filter(
          (course) => Number(course.price) > 2000
        );
      }
    }

    setFilteredCourses(updatedCourses);
  }, [search, category, price, allCourses]);

  // DELETE FUNCTION
  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sellerId: userId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message || "Delete failed ❌");
      } else {
        setFilteredCourses((prev) =>
          prev.filter((c) => c._id !== courseId)
        );
        setToast("Course removed successfully ✅");
      }
    } catch (error) {
      setToast("Delete failed ❌");
    }

    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div>
      <Navbar />

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-xl z-50">
          {toast}
        </div>
      )}

      <div className="min-h-screen p-6 bg-gray-300">

        {/* FILTER BAR */}
        <div className="bg-gray-700 rounded-xl shadow-md p-4 mb-8 flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">

          <div className="flex-1">
            <label className="text-sm font-medium text-white mb-1 block">
              Search
            </label>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         bg-gray-50 focus:ring-2 focus:ring-[#6f26eb]"
            />
          </div>

          <div className="w-full sm:w-56">
            <label className="text-sm font-medium text-white mb-1 block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
            >
              <option value="all">All Categories</option>
              <option value="web-development">Web Development</option>
              <option value="app-development">App Development</option>
              <option value="ai-ml">AI / ML</option>
              <option value="programming">Programming</option>
            </select>
          </div>

          <div className="w-full sm:w-56">
            <label className="text-sm font-medium text-white mb-1 block">
              Price
            </label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
            >
              <option value="all">All Prices</option>
              <option value="low">Below ₹500</option>
              <option value="medium">₹500 – ₹2000</option>
              <option value="high">Above ₹2000</option>
            </select>
          </div>

          <button
            onClick={() => {
              setCategory("all");
              setPrice("all");
              setSearch("");
            }}
            className="px-4 py-2 bg-white rounded-lg font-medium"
          >
            Clear
          </button>
        </div>

        {/* COURSES GRID */}
        {loading ? (
          <p className="text-center text-lg text-gray-700">
            Loading courses...
          </p>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold text-gray-800">
              No Courses Found
            </h2>
            <p className="text-gray-600 mt-2">
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="relative w-[300px] h-[520px]
                bg-gray-900
                border border-white/20
                rounded-[18px]
                p-5
                flex flex-col justify-between
                shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                transition-all duration-300 ease-in-out
                hover:-translate-y-[6px]
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
              >

                {/* ADMIN MENU */}
                {role === "admin" && (
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === course._id ? null : course._id
                        );
                      }}
                      className="text-white text-xl px-2 py-1 rounded-md hover:bg-white/20 transition"
                    >
                      ⋮
                    </button>

                    {activeMenu === course._id && (
                      <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-white/20 rounded-lg shadow-lg overflow-hidden z-20">
                        <button
                          onClick={() => {
                            setActiveMenu(null);
                            navigate(`/edit/${course._id}`);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenu(null);
                            handleDelete(course._id);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* IMAGE */}
                <img
                  src={`http://localhost:5000/uploads/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-45 rounded-xl object-cover"
                />

                {/* CONTENT */}
                <div className="mt-4">
                  <h2 className="text-[20px] font-semibold text-white line-clamp-2">
                    {course.title}
                  </h2>

                  <h3 className="text-[16px] text-gray-400 mt-2">
                    {course.firm}
                  </h3>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[14px] text-gray-300">
                      {course.category}
                    </span>

                    <span className="bg-[#10b475] text-white text-[12px] font-bold px-3 h-6 rounded-full flex items-center justify-center">
                      {course.language}
                    </span>
                  </div>

                  <p className="text-[16px] font-semibold text-white mt-3">
                    ₹ {course.price}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/view/${course._id}`)}
                    className="h-9 rounded-lg bg-[#e24e4e] text-white font-semibold hover:bg-amber-400"
                  >
                    View Detail
                  </button>

                  <button
                    onClick={() => {
                      const existing =
                        JSON.parse(localStorage.getItem("compareCourses")) ||
                        [];

                      if (existing.includes(course._id)) {
                        setToast("Course already added");
                        setTimeout(() => setToast(""), 2000);
                        return;
                      }

                      if (existing.length >= 5) {
                        setToast("Max 5 courses allowed");
                        setTimeout(() => setToast(""), 2000);
                        return;
                      }

                      localStorage.setItem(
                        "compareCourses",
                        JSON.stringify([...existing, course._id])
                      );

                      setToast("Added to compare");
                      setTimeout(() => setToast(""), 2000);
                    }}
                    className="h-9 rounded-lg bg-gray-500 text-white font-semibold hover:bg-black"
                  >
                    Add to Compare
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckCourses;
