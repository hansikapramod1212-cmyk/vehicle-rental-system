import React from 'react';
import Nav from "../Nav/Nav";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Horizontal Navbar */}
      <Nav />

      {/* Main Home Content */}
      <div className="home-content">
        <h1>Welcome to Auto Rent Pro</h1>
        <p>Manage users, view vehicles, and explore reservations 🚘</p>
      </div>
    </div>
  );
}

export default Home;
