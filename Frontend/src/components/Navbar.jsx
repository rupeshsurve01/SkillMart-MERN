import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-[#6f26eb]"
        : "text-gray-600 hover:text-[#6f26eb]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center">
            <img
              src="/ss-logo-lg.png"
              alt="SkillMart"
              className="h-7 w-auto"
            />
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/my-courses" className={navLinkClass}>My Courses</NavLink>
            <NavLink to="/compare" className={navLinkClass}>Compare</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3">
            <NavLink to="/my-learning">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <img
                  src="/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.webp"
                  alt="My Learning"
                  className="h-6 w-auto"
                />
              </button>
            </NavLink>

            {/* HAMBURGER */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 px-6 py-5">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/my-courses" onClick={() => setOpen(false)} className={navLinkClass}>
              My Courses
            </NavLink>
            <NavLink to="/my-learning" onClick={() => setOpen(false)} className={navLinkClass}>
              My Learning
            </NavLink>
            <NavLink to="/compare" onClick={() => setOpen(false)} className={navLinkClass}>
              Compare
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/login" onClick={() => setOpen(false)} className={navLinkClass}>
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
