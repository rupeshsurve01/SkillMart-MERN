import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // reusable classes
  const navLinkClass = ({ isActive }) =>
    `font-medium transition
     ${isActive ? "text-[#6f26eb]" : "text-gray-600 hover:text-[#6f26eb]"}`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-18">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="ss-logo-lg.png"
              alt="Logo"
              className="h-6 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/my-courses" className={navLinkClass}>
              My Courses
            </NavLink>

            <NavLink to="/compare" className={navLinkClass}>
              Compare
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>

            <NavLink to="/login" className={navLinkClass}>
              Log out
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <NavLink to="/my-learning">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <img
                  src="shopping-cart-icon-shopping-basket-on-transparent-background-free-png.webp"
                  alt="Cart"
                  className="h-6 w-auto"
                />
              </button>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-4 p-6">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/my-courses" className={navLinkClass} onClick={() => setOpen(false)}>
              My Courses
            </NavLink>

            <NavLink to="/my-learning" className={navLinkClass} onClick={() => setOpen(false)}>
              My Learning
            </NavLink>

            <NavLink to="/compare" className={navLinkClass} onClick={() => setOpen(false)}>
              Compare
            </NavLink>

            <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
              Contact Us
            </NavLink>

            <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
              Log out
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
