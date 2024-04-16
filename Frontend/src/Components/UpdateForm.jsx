// Imports
import React, { useState, useEffect } from "react";
import "./UpdateForm.css"; 

// Learned hangleChange and handleSubmit through https://www.w3schools.com/react/react_forms.asp
function UpdateForm() {
  const [products, setProducts] = useState([]); // State to hold products
  const [productId, setProductId] = useState("");
  
  const [newStock, setNewStock] = useState("");

  // This is a function to fetch the data in products
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8071/products");
    const data = await response.json();
    setProducts(data); // Store the fetched products
    // If the length of the data array is not nothing, then...
    if (data.length > 0) {
      setProductId(data[0].product_id); // Default to the first product's ID
    }

  };

  useEffect(() => {
    // Fetch products from the backend (used in the dropdown menu on frontend)
    fetchProducts();
  }, []);

  // Updating the values based on what the event name is, if it is
  // productId, then do setProductID, if not, setNewStock (because we only have two fields for update)
  const handleChange = (event) => {
    if (event.target.name === "productId") {
      setProductId(event.target.value);
    } else {
      setNewStock(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Modified code that is based on https://apidog.com/blog/fetch-post-json/ below "How to Fetch Post JSON Data" as a base and modified it to fit
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

    alert(data.message); // Show alert with the response message
   
  };

  // Setting up the update form (using css to format it)
  // When submitting the form, go to handleSubmit 
  return (
    <div className="update-form-container">
      <h2>Update Product Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="update-form-group">
          <label>Product ID:</label>
          <select /* Select used for the dropdown menu of update */
            name="productId"
            value={productId}
            onChange={handleChange}
            required
          >
            {products.map((product) => ( /* Gets the product_id from product as the key and value for the dropdown menu */
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
