 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    gmail: "",
    password: "",   // ✅ include password in initial state
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const sendRequest = () => {
    // returns a full axios response; you can also await here if you prefer
    return axios.post("http://localhost:5000/login", {
      gmail: user.gmail,
      password: user.password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendRequest();
      const data = res.data; // backend response body

      // ✅ accept common success shapes without changing backend
      const success =
        data?.status === "ok" ||
        data?.success === true ||
        !!data?.token;

      if (success) {
        // optional: store a flag/token so you can protect routes
        if (data?.token) localStorage.setItem("token", data.token);
        localStorage.setItem("auth", "true");

        alert("Login Success");
        navigate("/userdetails"); // or "/mainhome" if you prefer
      } else {
        alert(data?.message || "Login error");
      }
    } catch (err) {
      alert("Error: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Gmail</label><br />
        <input
          type="email"
          name="gmail"
          value={user.gmail}
          onChange={handleInputChange}
          required
        />
        <br /><br />

        <label>Password</label><br />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
