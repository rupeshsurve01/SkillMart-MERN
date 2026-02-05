import React from "react";
import { Link } from "react-router-dom";
import Contact from "../Pages/Contact";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold">Rupesh Surve</h2>
          <p className="mt-2 text-sm">
            Aspiring MERN Stack Developer building real-world projects.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link  to="/allcourses">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li> 
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="https://www.linkedin.com/in/rupeshsurve/">LinkedIn</Link></li>
            <li><Link to="https://github.com/rupeshsurve01/">GitHub</Link></li>
            <li><Link to="https://x.com/rupeshsurve_01">Twitter</Link></li>
            <li><Link to="https://www.instagram.com/rupesh_surve_01">Instagram</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Rupesh Surve. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
