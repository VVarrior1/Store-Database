import React, { useState } from 'react';
import './UpdateForm.css'; // Import the CSS file for styling

function UpdateForm() {
  const [productId, setProductId] = useState('');
  const [newStock, setNewStock] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'productId') {
      setProductId(e.target.value);
    } else {
      setNewStock(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8071/updateProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStock }),
      });
      const data = await response.json();
      console.log(data);

      // Reload the page to refresh the table
      window.location.reload();
      alert(data.message); // Show a simple alert with the response message
       
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Product Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="update-form-group">
          <label>Product ID:</label>
          <input type="text" name="productId" value={productId} onChange={handleChange} required />
        </div>
        <div className="update-form-group">
          <label>New Stock:</label>
          <input type="number" name="newStock" value={newStock} onChange={handleChange} required />
        </div>
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;