import React from "react";
import { Link } from "react-router-dom";
import "./Vehiclebook.css"; // Optional CSS for styling buttons

function Vehiclebook() {
  return (
    <div className="vehiclebook-container">
      <h1>Vehicle Book</h1>

      <div className="vehicle-buttons">
        <Link to="/lorry">
          <button className="vehicle-btn">Lorry</button>
        </Link>

        <Link to="/sedanrent">
          <button className="vehicle-btn">Sedan</button>
        </Link>

        <Link to="/bike">
          <button className="vehicle-btn">Bike</button>
        </Link>
      </div>
    </div>
  );
}

export default Vehiclebook;
