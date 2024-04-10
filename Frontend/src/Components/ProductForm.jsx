import React, { useState } from 'react';
import './ProductForm.css'; // Import the CSS file for styling

function ProductForm() {
  const [product, setProduct] = useState({
    product_name: '',
    product_id: '',
    stock: '',
    supplier_id: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8071/insertProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);
      alert(data.message); // Show a simple alert with the response message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="product_name" value={product.product_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <input type="text" name="product_id" value={product.product_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Supplier ID:</label>
          <input type="text" name="supplier_id" value={product.supplier_id} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;