import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ViewDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="bg-gray-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* COURSE THUMBNAIL */}
        <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg mb-10">
          <img
            src={`http://localhost:5000/uploads/${course.thumbnail}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {course.title}
            </h1>

            <p className="text-lg text-gray-600">{course.shortDesc}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {course.category}
              </span>

              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {course.level} Level
              </span>

              <span className="px-4 py-1 bg-red-300 text-black-700 rounded-full text-sm font-semibold">
                {course.language}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">📚 Course Syllabus</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {course.syllabus}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
              <p>
                🕒 <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                🎥 <strong>Lectures:</strong> {course.lectures}
              </p>
              <p>
                🏢 <strong>Institute:</strong> {course.firm}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24">
            <p className="text-3xl font-extrabold text-gray-900 mb-4">
              ₹ {course.price}
            </p>

            <button
              onClick={async () => {
                const token = localStorage.getItem("token");

                if (!token) {
                  alert("Please login first");
                  navigate("/login");
                  return;
                }

                try {
                  const res = await fetch("http://localhost:5000/api/enroll", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                     },
                    body: JSON.stringify({
                      courseId: course._id,
                    }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    // ❌ error case (already enrolled, validation error, etc.)
                    alert(data.message || "Enrollment failed");
                    return;
                  }

                  alert("Enrolled successfully 🎉");
                  navigate("/my-learning");
                  // eslint-disable-next-line no-unused-vars
                } catch (error) {
                  alert("Server error, please try again later");
                }
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Enroll Now
            </button>

            <button
              onClick={async () => {
                const token = localStorage.getItem("token");

                if (!token) {
                  navigate("/login");
                  return;
                }

                try {
                  const res = await fetch(
                    "http://localhost:5000/api/wishlist",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // ✅ Correct place
                      },
                      body: JSON.stringify({
                        courseId: course._id, // ❌ No token here
                      }),
                    },
                  );

                  const data = await res.json();

                  if (!res.ok) {
                    alert(data.message);
                    return;
                  }

                  alert("Added to wishlist ❤️");
                } catch (err) {
                  alert("Server error");
                }
              }}
              className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-black mt-2"
            >
              Add to Wishlist
            </button>

            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>✔ Full lifetime access</p>
              <p>✔ Learn at your own pace</p>
              <p>✔ Certificate of completion</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetails;
