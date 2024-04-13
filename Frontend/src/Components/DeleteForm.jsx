import React, { useState } from 'react';
import './DeleteForm.css'; // Import the CSS file for styling

function DeleteForm() {
  const [productId, setProductId] = useState('');

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(productId.length != 9){
        alert("Product ID must be exactly 9 digits long.")
        return;
    }

    try {
      const response = await fetch(`http://localhost:8071/deleteProduct/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);

      window.location.reload(); // Reloads the pages so that the table is refreshed

      alert(data.message); // Show a simple alert with the response message
       
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="delete-form-container">
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="delete-form-group">
          <label>Product ID:</label>
          <input type="text" name="product_id" value={productId} onChange={handleChange} required />
        </div>
        <button type="delete" className="delete-button">Delete</button>
      </form>
    </div>
  );
}

export default DeleteForm;