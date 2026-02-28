import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">

        {/* Brand Section */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">
            SkillMart
          </h2>
          <p className="text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
            A modern platform for buying, selling, and comparing online courses.
            Learn smarter. Teach better. Grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/allcourses" className="hover:text-white transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Connect With Me
          </h3>

          <div className="flex flex-col items-center sm:items-start space-y-3 text-sm">
            <a
              href="https://www.linkedin.com/in/rupeshsurve/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
              LinkedIn
            </a>

            <a
              href="https://github.com/rupeshsurve01/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <img src="/git.svg" alt="GitHub" className="h-5 w-5" />
              GitHub
            </a>

            <a
              href="https://x.com/rupeshsurve_01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <img src="/x.svg" alt="Twitter" className="h-5 w-5" />
              Twitter
            </a>

            <a
              href="https://www.instagram.com/rupesh_surve_01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <img src="/insta.svg" alt="Instagram" className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rupesh Surve. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;