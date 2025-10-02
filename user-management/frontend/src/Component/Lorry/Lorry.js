import React, { useState } from "react";
import "./Lorry.css"; // You can reuse the same CSS as Bike.css

function Lorry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lorryModel: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = formData;
      setSubmittedData(updatedData);
      setEditIndex(null);
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      lorryModel: "",
      startDate: "",
      endDate: "",
      paymentMethod: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  const handlePrintRow = (item, index) => {
    const tableHTML = `
      <html>
        <head><title>Lorry Rental #${index + 1}</title></head>
        <body>
          <h2>Lorry Rental Entry #${index + 1}</h2>
          <table border="1" cellspacing="0" cellpadding="10">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Name</td><td>${item.name}</td></tr>
            <tr><td>Email</td><td>${item.email}</td></tr>
            <tr><td>Phone</td><td>${item.phone}</td></tr>
            <tr><td>Lorry Model</td><td>${item.lorryModel}</td></tr>
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
    <div className="vehicle-page-container">
      <h2>Lorry Rental Form</h2>

      <form onSubmit={handleSubmit} className="vehicle-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Lorry Model:
          <input type="text" name="lorryModel" value={formData.lorryModel} onChange={handleChange} required />
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

        <button type="submit">{editIndex !== null ? "Update Rental" : "Submit Rental"}</button>
      </form>

      {submittedData.length > 0 && (
        <div className="vehicle-table-container">
          <h2>Submitted Rentals</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Lorry Model</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.lorryModel}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.paymentMethod}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
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

export default Lorry;
