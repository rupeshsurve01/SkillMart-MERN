import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const CheckCourses = () => {
  const [userData, setUserData] = useState([])

  const getData = async () => {

   const response = await axios.get("http://localhost:5000/api/courses");
setUserData(response.data);

    console.log(response.data) // full array

    setUserData(response.data)
  }

  return (
    <div>
      <Navbar />
      <button onClick={getData}>Click</button>

      {/* Images appear ONLY after click */}
      {userData.map((elem, idx) => (
        <img
          key={idx}
          src={elem.download_url}
          alt="picsum"
          width="200"
        />
      ))}
    </div>
  )
}

export default CheckCourses
