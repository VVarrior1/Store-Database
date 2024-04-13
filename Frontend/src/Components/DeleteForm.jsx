import React, { useState, useEffect } from "react";
import "./DeleteForm.css"; // Import the CSS file for styling

function DeleteForm() {
  const [products, setProducts] = useState([]); // Holds the list of products fetched from the database
  const [productId, setProductId] = useState(""); // Holds the selected product ID for deletion

  // useEffect hook to fetch products from the database on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an HTTP GET request to fetch all products
        const response = await fetch("http://localhost:8071/products");
        const data = await response.json();
        setProducts(data); // Store the fetched products in state
        if (data.length > 0) {
          // Automatically select the first product's ID as the default
          setProductId(data[0].product_id);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    // Update the productId state when the dropdown selection changes
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    try {
      // Make an HTTP DELETE request to delete the selected product
      const response = await fetch(
        `http://localhost:8071/deleteProduct/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json(); // Parse the JSON response from the server
      console.log(data);

      window.location.reload(); // Reloads the page to refresh the data (optional)

      alert(data.message); // Show an alert with the message from the server response
    } catch (error) {
      console.error("Error:", error); // Log any errors to the console
    }
  };

  return (
    <div className="delete-form-container">
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="delete-form-group">
          <label>Product ID:</label>
          {/* Dropdown menu for selecting the product ID to delete */}
          <select
            name="product_id"
            value={productId}
            onChange={handleChange}
            required
          >
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
