import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="bg-gray-200">
      {/* <Navbar /> */}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            About SkillMart
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            A smart platform to learn, teach, and grow skills
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What is SkillMart?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SkillMart is an online learning platform designed to connect
              learners with high-quality courses created by skilled instructors.
              It helps users explore, compare, and enroll in courses that match
              their learning goals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The platform focuses on practical, real-world skills and provides
              a simple and user-friendly experience for both students and course
              creators.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Why SkillMart?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Easy course discovery and comparison</li>
              <li>✔ Secure authentication and dashboards</li>
              <li>✔ Instructor-friendly course management</li>
              <li>✔ Quality control through course approval</li>
              <li>✔ Built using modern MERN stack technologies</li>
            </ul>
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="mt-16 bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The mission of SkillMart is to make learning accessible, organized,
            and impactful. By bridging the gap between learners and educators,
            SkillMart aims to create a trusted learning marketplace where
            knowledge turns into opportunity.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          SkillMart is a continuously evolving project built as part of a
          full-stack development journey.
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default About;
