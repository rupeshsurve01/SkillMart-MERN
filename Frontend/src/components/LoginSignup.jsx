/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const url =
    action === "Sign Up"
      ? `${import.meta.env.VITE_API_URL}/api/auth/register`
      : `${import.meta.env.VITE_API_URL}/api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
        setError(data.message || "Something went wrong");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] bg-white/95 border border-slate-200 p-8 shadow-2xl backdrop-blur">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900">{action}</h2>
          <p className="text-slate-500 mt-2">
            {action === "Sign Up"
              ? "Create your SkillMart account"
              : "Welcome back — sign in to continue"}
          </p>
        </div>

        <div className="flex rounded-3xl border border-slate-200 overflow-hidden mb-6">
          {['Sign Up', 'Login'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAction(type)}
              className={`w-1/2 px-4 py-3 text-sm font-medium transition ${
                action === type
                  ? "bg-[#6f26eb] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {action === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#6f26eb]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-[#6f26eb] py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : action}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          {action === "Sign Up"
            ? "Already have an account?"
            : "New to SkillMart?"}{" "}
          <button
            type="button"
            onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}
            className="font-semibold text-[#6f26eb] hover:text-purple-700"
          >
            {action === "Sign Up" ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
