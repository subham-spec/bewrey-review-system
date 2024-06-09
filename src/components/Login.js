import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("Welcome man");
            navigate("/landingpage");
          } else if (res.data === "notexist") {
            alert("Oops new user.");
            navigate("/register");
          } else if (res.data === "wrongpassword") {
            alert("Wrong Password");
          }
        })
        .catch((e) => {
          alert("Wrong Details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function goToregister() {
    navigate("/register");
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Bewery Manager</h1>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <button className="nav_register" onClick={goToregister}>
          New User
        </button>
      </form>
    </div>
  );
};

export default Login;