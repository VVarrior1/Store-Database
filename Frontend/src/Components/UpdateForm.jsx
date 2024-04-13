import React, { useState, useEffect } from "react";
import "./UpdateForm.css"; // Import the CSS file for styling

function UpdateForm() {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [productId, setProductId] = useState("");
  const [newStock, setNewStock] = useState("");

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8071/products");
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) {
          setProductId(data[0].product_id); // Default to the first product's ID
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "productId") {
      setProductId(e.target.value);
    } else {
      setNewStock(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8071/updateProduct/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newStock }),
        }
      );
      const data = await response.json();
      console.log(data);

      // Reload the page to refresh the table
      window.location.reload();
      alert(data.message); // Show a simple alert with the response message
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Product Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="update-form-group">
          <label>Product ID:</label>
          <select
            name="productId"
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
        <div className="update-form-group">
          <label>New Stock:</label>
          <input
            type="number"
            name="newStock"
            value={newStock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
