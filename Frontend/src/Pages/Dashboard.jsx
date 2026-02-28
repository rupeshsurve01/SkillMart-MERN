import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "./About";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6">

        <div className="absolute w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-600 rounded-full blur-3xl opacity-40 top-5 sm:top-10 left-5 sm:left-10"></div>
        <div className="absolute w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-500 rounded-full blur-3xl opacity-40 bottom-5 sm:bottom-10 right-5 sm:right-10"></div>

        <div className="relative z-10 text-center max-w-5xl">

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            Master New Skills With  
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#6f26eb] mt-3 font-extrabold">
              SkillMart
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 px-2">
            A marketplace where passionate creators teach,
            and ambitious learners grow.
          </p>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-10 text-white">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#6f26eb]">50+</h3>
              <p className="text-gray-400 text-sm sm:text-base">Courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#6f26eb]">1K+</h3>
              <p className="text-gray-400 text-sm sm:text-base">Students</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#6f26eb]">20+</h3>
              <p className="text-gray-400 text-sm sm:text-base">Instructors</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link to="/allcourses" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-[#6f26eb] text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-purple-700 transition duration-300">
                Explore Courses
              </button>
            </Link>

            <Link to="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 border border-white bg-gray-300 text-white font-semibold rounded-xl hover:bg-white hover:text-black transition duration-300">
                Become Instructor
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-gray-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12">
             SkillMart Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#6f26eb]">
                Quality Courses
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Curated and verified courses from passionate instructors.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#6f26eb]">
                Smart Learning
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Learn at your own pace with structured content.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#6f26eb]">
                Grow Your Skills
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Upgrade your career with practical and real-world knowledge.
              </p>
            </div>

          </div>
        </div>
      </div>

      <About />
      <Footer />
    </div>
  );
};

export default Dashboard;