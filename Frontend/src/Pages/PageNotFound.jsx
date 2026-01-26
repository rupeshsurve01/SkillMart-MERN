import React from 'react'
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PageNotFound = () => {
  return (
    <>
          <section className="h-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full text-center bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Image */}
        <img
          src="/notFound.svg"
          alt="Page Not Found"
          className="w-64 mx-auto mb-6"
        />

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Looks like you're lost
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We can’t seem to find the page you’re looking for.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300"
        >
          Back to Home
          <HiOutlineArrowNarrowRight className="text-xl" />
        </Link>
      </div>
    </section>
    </>
  )
}

export default PageNotFound
