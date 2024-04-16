// Imports
import React, { useState, useEffect } from "react";
import "./DeleteForm.css"; 

// Learned hangleChange and handleSubmit through https://www.w3schools.com/react/react_forms.asp
function DeleteForm() {
  const [products, setProducts] = useState([]); // Holds the list of products 
  const [productId, setProductId] = useState(""); // Holds the selected product ID 

  // Same as the fetchProducts in UpdateForm.jsx
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8071/products");
    const data = await response.json();
    setProducts(data); // Store the fetched products 
    if (data.length > 0) {
      // Select the first product's ID as the default if data.length is not nothing
      setProductId(data[0].product_id);
    }
  };

  // Same as the useEffect in UpdateForm.jsx
  useEffect(() => {
    // Fetch products from the backend (used in the dropdown menu on frontend)
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    // Update the productId state when the dropdown selection changes
    setProductId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Modified code that is based on https://apidog.com/blog/fetch-post-json/ below "How to Fetch Post JSON Data" as a base and modified it to fit
    const response = await fetch(
        `http://localhost:8071/deleteProduct/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);

      location.reload(); // Reloads the page to refresh data

      alert(data.message); // Show an alert with response message
  };

  // Setting up the delete form (using css to format it)
  // When submitting the form, go to handleSubmit
  return (
    <div className="delete-form-container">
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="delete-form-group">
          <label>Product ID:</label>
          {/* Select part is the same as UpdateForm.jsx */}
          <select /* Select used for the dropdown menu of update */
            name="product_id"
            value={productId}
            onChange={handleChange}
            required
          >
            {/* Gets the product_id from product as the key and value for the dropdown menu, below that is the format of the label */}
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name} (ID: {product.product_id})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="delete-button">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteForm;
