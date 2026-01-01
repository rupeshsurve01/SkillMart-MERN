import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

import user_icon from "../../assets/name-icon-4.jpg";
import email_icon from "../../assets/email-and-mail-icon-black-free-png.webp";
import password_icon from "../../assets/OIP.jpg";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async () => {
  const url =
    action === "Sign Up"
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/login";

  const body =
    action === "Sign Up"
      ? { name, email, password }
      : { email, password };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      navigate("/dashboard");
    }
  } catch (error) {
    alert("Server not reachable");
  }
};


  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit" : "submit gray"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>

        <div
          className={action === "Login" ? "submit" : "submit gray"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      <div className="submit main-btn" onClick={handleSubmit}>
        {action}
      </div>
    </div>
  );
};

export default LoginSignup;
