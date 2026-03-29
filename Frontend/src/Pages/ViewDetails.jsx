import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;
const starOptions = [1, 2, 3, 4, 5];

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses/${id}`);
        setCourse(res.data);
        setReviews(res.data.reviews || []);

        const token = localStorage.getItem("token");
        if (!token) {
          setIsEnrolled(false);
          return;
        }

        try {
          const enrollRes = await axios.get(`${API_URL}/api/enroll/check/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsEnrolled(enrollRes.data.enrolled);
        } catch {
          setIsEnrolled(false);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login first", "error");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: course._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Enrollment failed", "error");
        return;
      }

      showToast("Enrolled successfully", "success");
      navigate("/my-learning");
    } catch {
      showToast("Server error, please try again later", "error");
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: course._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Failed to add to wishlist", "error");
        return;
      }

      showToast(data.message || "Added to wishlist", "success");
    } catch {
      showToast("Server error", "error");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login to review", "error");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/courses/${id}/review`,
        {
          rating: Number(rating),
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      showToast("Review added!", "success");
      setComment("");
      setRating(5);

      const updated = await axios.get(`${API_URL}/api/courses/${id}`);
      setCourse(updated.data);
      setReviews(updated.data.reviews || []);
    } catch (error) {
      showToast(error.response?.data?.message || "Error adding review", "error");
    }
  };

  return (
    <div className="bg-gray-300">
      <Navbar />

      {toast.message && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-semibold shadow-2xl transition-all ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="w-full h-64 md:h-[380px] rounded-2xl overflow-hidden shadow-lg mb-10">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-800">{course.title}</h1>

            <p className="text-lg text-gray-600">{course.shortDesc}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {course.category}
              </span>

              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {course.level} Level
              </span>

              <span className="px-4 py-1 bg-red-300 text-gray-800 rounded-full text-sm font-semibold">
                {course.language}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Course Syllabus</h2>
              <p className="text-gray-700 whitespace-pre-line">{course.syllabus}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Lectures:</strong> {course.lectures}
              </p>
              <p>
                <strong>Institute:</strong> {course.firm}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit md:sticky md:top-24">
            <p className="text-3xl font-extrabold text-gray-900 mb-4">
              Rs. {course.price}
            </p>

            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Enroll Now
            </button>

            <button
              onClick={handleWishlist}
              className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-black mt-2"
            >
              Add to Wishlist
            </button>

            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>Full lifetime access</p>
              <p>Learn at your own pace</p>
              <p>Certificate of completion</p>
            </div>
          </div>
        </div>

        {isEnrolled && (
          <div className="mt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
              <div className="w-full md:w-[280px] rounded-[28px] bg-slate-900 px-7 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                  Learner Feedback
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight">Reviews & Ratings</h2>
                <div className="mt-8 rounded-3xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-5xl font-black">
                    {course.averageRating > 0 ? course.averageRating.toFixed(1) : "New"}
                  </p>
                  <div className="mt-3 flex text-2xl text-amber-300">
                    {"★".repeat(Math.round(course.averageRating || 0))}
                    <span className="text-white/25">
                      {"★".repeat(5 - Math.round(course.averageRating || 0))}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">
                    {reviews.length > 0
                      ? `${reviews.length} learner${reviews.length > 1 ? "s have" : " has"} shared feedback`
                      : "No reviews yet. Be the first to share your experience."}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
                <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 px-6 py-5 text-white">
                  <h3 className="text-2xl font-bold">Write a Review</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Tell other learners what stood out and how this course helped you.
                  </p>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-6 p-6 md:p-8">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Your Rating
                    </label>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {starOptions.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl transition ${
                            rating >= value
                              ? "border-amber-400 bg-amber-50 text-amber-500 shadow-[0_10px_25px_rgba(251,191,36,0.25)]"
                              : "border-slate-200 bg-slate-50 text-slate-300 hover:border-slate-300 hover:text-slate-500"
                          }`}
                          aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-slate-500">
                      Selected rating: <span className="font-semibold text-slate-800">{rating}/5</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Your Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-4 min-h-[180px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="What did you learn, enjoy, or wish was better?"
                      rows="5"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      Helpful reviews make it easier for other learners to choose with confidence.
                    </p>
                    <button
                      type="submit"
                      className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-2 gap-2">
                      <span className="font-semibold">{review.user?.name || "Anonymous"}</span>
                      <span>{"*".repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewDetails;
