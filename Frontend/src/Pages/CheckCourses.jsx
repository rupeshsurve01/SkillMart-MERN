import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const CheckCourses = () => {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/courses"
      );
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Failed to load courses:",
        error.response?.data || error.message
      );
      setUserData([]); // prevent crash
    }
  };

  getData();
}, []);


  return (
    <div>
      <Navbar />

     <div className="flex flex-wrap gap-6 p-6">
  {userData.length === 0 ? (
    <p className="text-gray-600 text-lg">
      No courses available right now.
    </p>
  ) : (
    userData.map((course) => (
      <div
        key={course._id}
        className="w-[300px] h-[520px] bg-white rounded-[18px] p-5 flex flex-col justify-between 
                   shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
                   transition-all duration-300 ease-in-out 
                   hover:-translate-y-[6px] 
                   hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      >
        {/* IMAGE */}
        <img
          src={`http://localhost:5000/uploads/${course.thumbnail}`}
          alt={course.title}
          className="w-full h-45 rounded-xl object-cover"
        />

        {/* CONTENT */}
        <div className="mt-4">
          <h2 className="text-[20px] font-semibold text-gray-800 line-clamp-2">
            {course.title}
          </h2>

          <h2 className="text-[18px] font-semibold text-gray-500 mt-2">
            {course.firm}
          </h2>

          <div className="flex justify-between items-center mt-3">
            <h3 className="text-[16px] text-gray-700">
              {course.category}
            </h3>

            <span className="bg-[#10b475] text-white text-[12px] font-bold px-3 h-6 rounded-full flex items-center justify-center">
              {course.language}
            </span>
          </div>

          <h2 className="text-[16px] font-semibold text-gray-800 mt-3">
            ₹ {course.price}
          </h2>
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
                JSON.parse(localStorage.getItem("compareCourses")) || [];

              if (existing.includes(course._id)) {
                alert("Course already added to compare");
                return;
              }

              if (existing.length >= 3) {
                alert("You can compare max 3 courses");
                return;
              }

              localStorage.setItem(
                "compareCourses",
                JSON.stringify([...existing, course._id])
              );

              alert("Added to compare");
            }}
            className="h-9 rounded-lg bg-gray-800 text-white font-semibold hover:bg-black"
          >
            Add to Compare
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default CheckCourses;
