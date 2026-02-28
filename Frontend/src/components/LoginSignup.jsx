/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const url =
    action === "Sign Up"
      ? "https://skillmart-mern-backend.onrender.com/api/auth/register"
      : "https://skillmart-mern-backend.onrender.com/api/auth/login";

const handleSubmit = async (e) => {
  e.preventDefault();

  const body =
    action === "Sign Up"
      ? { name, email, password }
      : { email, password };

  try {
    setLoading(true);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    // ✅ Success block only
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    alert(data.message);

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error("FETCH ERROR:", error);
    alert("Server not reachable");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {action}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {action === "Sign Up"
            ? "Create a new account"
            : "Welcome back, please login"}
        </p>

        {/* Toggle Buttons */}
        <div className="flex mb-6 rounded-lg overflow-hidden border">
          {["Sign Up", "Login"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAction(type)}
              className={`w-1/2 py-2 text-sm font-medium transition ${
                action === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {action === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : action}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
