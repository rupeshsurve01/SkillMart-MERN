import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import Navbar from '../components/Navbar'

const CheckCourses = () => {
  // const [userData, setUserData] = useState([])

  // const getData = async () => {

  //   const response = await axios.get("http://localhost:5000/api/courses");
  //   setUserData(response.data);

  //   console.log(response.data) // full array

  //   setUserData(response.data)
  // }

  return (
    <div>
      <Navbar />
      <div className="w-[300px] h-[520px] bg-white rounded-[18px] p-5 flex flex-col justify-between 
                shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
                transition-all duration-300 ease-in-out 
                hover:-translate-y-[6px] 
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]">

        {/* TOP IMAGE */}
        <div>
          <img
            src="https://ik.imagekit.io/sheryians/Cohort%202.0/cohort-3_ekZjBiRzc-2_76HU4-Mz5z.jpeg?updatedAt=1757741949621"
            alt="Hello"
            className="w-full h-[180px] rounded-[12px] object-cover"
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="mt-4">
          <h2 className="text-[18px] font-semibold text-gray-800 leading-snug">
            2.0 Job Ready AI Powered Cohort: Complete Web Development + DSA + Gen-AI + Aptitude
          </h2>

          <div className="flex justify-between items-center mt-3">
            <h3 className="text-[16px] text-gray-700">
              Shreyan's Coding School
            </h3>

            <span className="bg-[#10b475] text-white text-[12px] font-bold px-3 h-6 
                       rounded-full flex items-center justify-center">
              English
            </span>
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col gap-2">
          <button className="h-9 rounded-lg bg-[#e24e4e] text-white text-[14px] font-semibold
                       flex items-center justify-center
                       transition-colors duration-300 hover:bg-[#c93d3d]">
            View Detail
          </button>

          <button className="h-9 rounded-lg bg-[#e24e4e] text-white text-[14px] font-semibold
                       flex items-center justify-center
                       transition-colors duration-300 hover:bg-[#c93d3d]">
            Add to Compare
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckCourses
