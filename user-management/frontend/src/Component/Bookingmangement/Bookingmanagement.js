import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bookingmanagement.css";

const vehicles = [
  { id: 1, vehicleName: "Honda Bike", vehicleType: "Bike", vehicleModel: "CBR 150", pricePerDay: "50" },
  { id: 2, vehicleName: "Tata Lorry", vehicleType: "Lorry", vehicleModel: "407 Truck", pricePerDay: "120" },
  { id: 3, vehicleName: "Suzuki Van", vehicleType: "Van", vehicleModel: "Ertiga", pricePerDay: "70" },
];

function Bookingmanagement() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleName: "",
    vehicleType: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
  });

  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null); // Use _id from MongoDB

  // Fetch bookings from backend on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      ...formData,
      vehicleName: vehicle.vehicleName,
      vehicleType: vehicle.vehicleType,
      vehicleModel: vehicle.vehicleModel,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update existing booking
        await axios.put(`http://localhost:5000/bookings/${editId}`, formData);
        setEditId(null);
      } else {
        // Add new booking
        await axios.post("http://localhost:5000/bookings", formData);
      }
      // Refresh list
      fetchBookings();

      // Reset form
      setFormData({
        ...formData,
        name: "",
        email: "",
        phone: "",
        startDate: "",
        endDate: "",
        paymentMethod: "",
      });
    } catch (err) {
      console.error("Error submitting booking:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const handleUpdate = (booking) => {
    setFormData(booking);
    setEditId(booking._id);
    setSelectedVehicle({
      vehicleName: booking.vehicleName,
      vehicleType: booking.vehicleType,
      vehicleModel: booking.vehicleModel,
    });
  };

  const handlePrint = (booking) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Booking Details</title></head><body>");
    printWindow.document.write("<h2>Booking Details</h2>");
    printWindow.document.write("<ul>");
    Object.keys(booking).forEach((key) => {
      if (key !== "__v" && key !== "_id") {
        printWindow.document.write(`<li><strong>${key}:</strong> ${booking[key]}</li>`);
      }
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="booking-container">
      {/* Left side: vehicle cards */}
      <div className="vehicle-list">
        <h2>Available Vehicles</h2>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`vehicle-card ${selectedVehicle?.id === vehicle.id ? "selected" : ""}`}
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <h3>{vehicle.vehicleName}</h3>
            <p>Type: {vehicle.vehicleType}</p>
            <p>Model: {vehicle.vehicleModel}</p>
            <p>Price/Day: ${vehicle.pricePerDay}</p>
          </div>
        ))}
      </div>

      {/* Right side: booking form + submitted bookings */}
      <div className="booking-form">
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Vehicle Name:
            <input type="text" name="vehicleName" value={formData.vehicleName} readOnly />
          </label>
          <label>
            Vehicle Type:
            <input type="text" name="vehicleType" value={formData.vehicleType} readOnly />
          </label>
          <label>
            Vehicle Model:
            <input type="text" name="vehicleModel" value={formData.vehicleModel} readOnly />
          </label>
          <label>
            Rental Start Date:
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </label>
          <label>
            Rental End Date:
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
          </label>
          <label>
            Payment Method:
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </label>
          <button type="submit">{editId ? "Update Booking" : "Submit Booking"}</button>
        </form>

        {/* Submitted bookings */}
        <div className="submitted-bookings">
          <h2>Submitted Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Vehicle</th>
                    <th>Type</th>
                    <th>Model</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{b.vehicleName}</td>
                      <td>{b.vehicleType}</td>
                      <td>{b.vehicleModel}</td>
                      <td>{b.startDate}</td>
                      <td>{b.endDate}</td>
                      <td>{b.paymentMethod}</td>
                      <td>
                        <button className="update-btn" onClick={() => handleUpdate(b)}>Update</button>
                        <button className="delete-btn" onClick={() => handleDelete(b._id)}>Delete</button>
                        <button className="print-btn" onClick={() => handlePrint(b)}>Print</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookingmanagement;
