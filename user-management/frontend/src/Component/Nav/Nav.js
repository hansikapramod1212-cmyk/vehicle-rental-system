import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* hamburger */}
      <button className="menu-btn" onClick={() => setOpen((v) => !v)}>☰</button>

      {/* dark overlay */}
      <div
        className={`backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* nav drawer */}
      <div className={`nav-drawer ${open ? "open" : ""}`}>
        <ul className="home-ul">
          <li className="home-li">
            <Link to="/mainhome" className="home-a" onClick={() => setOpen(false)}>
              <h1>Home</h1>
            </Link>
          </li>
          <li className="home-li">
            <Link to="/adduser" className="home-a" onClick={() => setOpen(false)}>
              <h1>Add User</h1>
            </Link>
          </li>
          <li className="home-li">
            <Link to="/userdetails" className="home-a" onClick={() => setOpen(false)}>
              <h1>Display User Details</h1>
            </Link>
          </li>

          {/* New Booking Management Button */}
          <li className="home-li">
            <Link to="/bookingmanagement" className="home-a" onClick={() => setOpen(false)}>
              <h1>Booking Management</h1>
            </Link>
          </li>

          <li className="home-li">
            <Link to="/regi" className="btn btn-register" onClick={() => setOpen(false)}>
              Register
            </Link>
          </li>
          <li className="home-li">
            <Link to="/log" className="btn btn-login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
