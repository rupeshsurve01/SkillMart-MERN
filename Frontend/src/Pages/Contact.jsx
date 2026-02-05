import React from 'react'
import Navbar from '../components/Navbar'

const Contact = () => {
  return (
    <div >
       <Navbar />
       <div className="bg-black h-screen text-white px-8 py-10 ">
  <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

  <form className="flex flex-col  gap-4 max-w-md">
    <input
      type="text"
      placeholder="Your Name"
      className="p-3 rounded bg-gray-800 text-white outline-none"
    />

    <input
      type="email"
      placeholder="Your Email"
      className="p-3 rounded bg-gray-800 text-white outline-none"
    />

    <input
      type="text"
      placeholder="Subject"
      className="p-3 rounded bg-gray-800 text-white outline-none"
    />


    <textarea
      placeholder="Your Message"
      rows="4"
      className="p-3 rounded bg-gray-800 text-white outline-none"
    ></textarea>

    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
    >
      Send Message
    </button>
  </form>
</div>

    </div>
  )
}

export default Contact
