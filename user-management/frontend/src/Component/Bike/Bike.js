import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bike.css";

function Bike() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bikeModel: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/bikes"; // Update if needed

  // Fetch all bike rentals from backend
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSubmittedData(response.data.bikes || response.data);
    } catch (error) {
      console.error("Error fetching bike rentals:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing entry
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        // Add new entry
        await axios.post(API_URL, formData);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        bikeModel: "",
        startDate: "",
        endDate: "",
        paymentMethod: "",
      });
      fetchData(); // Refresh list
    } catch (error) {
      console.error("Error saving bike rental:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting bike rental:", error);
    }
  };

  const handlePrintRow = (item, index) => {
    const tableHTML = `
      <html>
        <head><title>Bike Rental #${index + 1}</title></head>
        <body>
          <h2>Bike Rental Entry #${index + 1}</h2>
          <table border="1" cellspacing="0" cellpadding="10">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Name</td><td>${item.name}</td></tr>
            <tr><td>Email</td><td>${item.email}</td></tr>
            <tr><td>Phone</td><td>${item.phone}</td></tr>
            <tr><td>Bike Model</td><td>${item.bikeModel}</td></tr>
            <tr><td>Start Date</td><td>${item.startDate}</td></tr>
            <tr><td>End Date</td><td>${item.endDate}</td></tr>
            <tr><td>Payment Method</td><td>${item.paymentMethod}</td></tr>
          </table>
        </body>
      </html>
    `;
    const newWindow = window.open();
    newWindow.document.write(tableHTML);
    newWindow.print();
  };

  return (
    <div className="bike-page-container">
      <h2 className="bike-page-title">Bike Rental Form</h2>

      <div className="bike-form-container">
        <form onSubmit={handleSubmit} className="bike-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Bike Model:
            <input
              type="text"
              name="bikeModel"
              value={formData.bikeModel}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rental Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rental End Date:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Payment Method:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </label>

          <button type="submit">{editId ? "Update Rental" : "Submit Rental"}</button>
        </form>
      </div>

      {submittedData.length > 0 && (
        <div className="bike-table-container">
          <h2>Submitted Rentals</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bike Model</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.bikeModel}</td>
                  <td>{item.startDate?.slice(0, 10)}</td>
                  <td>{item.endDate?.slice(0, 10)}</td>
                  <td>{item.paymentMethod}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                    <button onClick={() => handlePrintRow(item, index)}>Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bike;
