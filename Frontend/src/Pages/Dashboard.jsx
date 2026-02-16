import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "./About";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      {/* HERO SECTION */}
<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">

  {/* Decorative Blur Circles */}
  <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-40 top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>

  <div className="relative z-10 text-center px-6 max-w-5xl">

    <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight">
      Master New Skills With  
      <span className="block text-8xl text-[#6f26eb] mt-3 font-extrabold">
        SkillMart
      </span>
    </h1>

    <p className="mt-6 text-lg md:text-2xl text-gray-400">
      A marketplace where passionate creators teach,
      and ambitious learners grow.
    </p>

    {/* Stats Section */}
    <div className="flex flex-wrap justify-center gap-8 mt-10 text-white">
      <div>
        <h3 className="text-3xl font-bold text-[#6f26eb]">50+</h3>
        <p className="text-gray-400">Courses</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-[#6f26eb]">1K+</h3>
        <p className="text-gray-400">Students</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-[#6f26eb]">20+</h3>
        <p className="text-gray-400">Instructors</p>
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
      <Link to="/allcourses">
        <button className="px-10 py-4 bg-[#6f26eb] text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-purple-700 transition duration-300">
          Explore Courses
        </button>
      </Link>

      <Link to="/register">
        <button className="px-10 py-4 border border-white bg-gray-300 text-white font-semibold rounded-xl hover:bg-white hover:text-black transition duration-300">
          Become Instructor
        </button>
      </Link>
    </div>

  </div>
</div>


      {/* FEATURES SECTION */}
      <div className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
             SkillMart Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold mb-4 text-[#6f26eb]">
                Quality Courses
              </h3>
              <p className="text-gray-600">
                Curated and verified courses from passionate instructors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold mb-4 text-[#6f26eb]">
                Smart Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace with structured content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold mb-4 text-[#6f26eb]">
                Grow Your Skills
              </h3>
              <p className="text-gray-600">
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
