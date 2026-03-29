import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `font-medium rounded-full px-2 py-1 transition-all duration-200 ${
      isActive
        ? "text-[#6f26eb] bg-[#f3e8ff] bg-opacity-40 shadow-sm"
        : "text-gray-600 hover:text-[#6f26eb] hover:bg-[#f3e8ff] hover:bg-opacity-20"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center">
            <img src="/Skill_Mart.png" alt="SkillMart" className="h-15 w-auto" />
          </NavLink>

          {/* DESKTOP MENU */}
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
              Contact
            </NavLink>

                        {role === "admin" && (
              <NavLink to="/admin" className={navLinkClass}>
                Requests
              </NavLink>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="ml-2 rounded-full bg-[#6f26eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-full bg-[#6f26eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Login
              </NavLink>
            )}

          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src="/wishlist (1).png"
                alt="Wishlist"
                className="h-6 w-auto"
              />
            </NavLink>

            <NavLink
              to="/my-learning"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src="/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.webp"
                alt="My Learning"
                className="h-6 w-auto"
              />
            </NavLink>

            <button
              aria-label="Toggle navigation"
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 px-6 py-5">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/my-courses"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              My Courses
            </NavLink>
            <NavLink
              to="/my-learning"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              My Learning
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/compare"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Compare
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Contact
            </NavLink>
            {token ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="text-left text-gray-700 hover:text-[#6f26eb] font-medium transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                Login
              </NavLink>
            )}
            {role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                Requests
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
