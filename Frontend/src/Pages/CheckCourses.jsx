import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const CheckCourses = () => {
  const [userData, setUserData] = useState([])

  const getData = async () => {

    const response = await axios.get(
      'https://picsum.photos/v2/list?page=1&limit=10'
    )
    console.log(response.data) // full array
    // example: first image URL-->response.data[0].download_url
    //   console.log(response.data[0].download_url)
    setUserData(response.data)
  }
  // const index = userData.map(function(elem,idx){
  //   return <div>elem.download_url</div>
  // })

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
