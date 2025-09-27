import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/mainhome"), 4000); // 4s then go to /home
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="splash-overlay">
      <h1 className="splash-title">🚗 Auto Rent Pro</h1>
      <p className="splash-tagline">Your smart solution for vehicle reservations</p>
      <ul className="splash-features">
        <li>✅ Easy User Management</li>
        <li>✅ Vehicle Availability</li>
        <li>✅ Quick & Secure Reservations</li>
        <li>✅ Clean, Modern UI</li>
      </ul>
      <div className="loader"></div>
    </div>
  );
}
