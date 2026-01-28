import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const CheckCourses = () => {
  const [userData, setUserData] = useState([]);

useEffect(() => {
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/api/courses");
    setUserData(response.data);
  };

  getData(); 
}, []); 



  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap gap-6 p-6">
        {userData.map((course) => (
          <div
            key={course._id}
            className="w-[300px] h-[520px] bg-white rounded-[18px] p-5 flex flex-col justify-between 
                       shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
                       transition-all duration-300 ease-in-out 
                       hover:-translate-y-[6px] 
                       hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            {/* TOP IMAGE */}
            <img
              src={`http://localhost:5000/uploads/${course.thumbnail}`}
              alt={course.title}
              className="w-full h-[180px] rounded-[12px] object-cover"
            />

            {/* CENTER CONTENT */}
            <div className="mt-4">
              <h2 className="text-[20px] font-semibold text-gray-800 leading-tight line-clamp-2">
                {course.title}
              </h2>
                          <div className="mt-4">
              <h2 className="text-[18px] font-semibold text-gray-500 leading-snug">
                {course.firm}
              </h2>

              <div className="flex justify-between items-center mt-3">
                <h3 className="text-[16px] text-gray-700">
                  {course.category}
                </h3>

                <span
                  className="bg-[#10b475] text-white text-[12px] font-bold px-3 h-6 
                             rounded-full flex items-center justify-center"
                >
                  {course.language}
                </span>
              </div>
              </div>
             <div className="mt-3">
              <h2 className="text-[16px] font-semibold text-gray-800 leading-snug">
               ₹ {course.price}
              </h2>
              </div>

            </div>

            {/* BOTTOM BUTTONS */}
            <div className="flex flex-col gap-2">
              <button onClick={() => {
                (e) =>{
                  userData.forEach
                  console.log(e)
                }
              }} className="h-9 rounded-lg bg-[#e24e4e] text-white font-semibold hover:bg-amber-400 active:scale-95 cursor-pointer">
                View Detail
              </button>

              <button  className="h-9 rounded-lg bg-[#e24e4e] text-white font-semibold hover:bg-amber-400 cursor-pointer active:scale-95">
                Add to Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckCourses;
