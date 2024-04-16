// Imports 
import React, { useState } from "react";
import "./ProductForm.css"; 

// Learned hangleChange and handleSubmit through https://www.w3schools.com/react/react_forms.asp
function ProductForm() {
  // setProduct can be used to update the state of the product table 
  const [product, setProduct] = useState({
    product_name: "",
    product_id: "",
    stock: "",
    supplier_id: "",
  });

  // Updates the state of product with the value directly inputed 
  const handleChange = (event) => {
     setProduct( { ...product, [event.target.name]: event.target.value });
  };

  // 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Checks for the insert to make sure that the insert is putting in correct inputs
    if (product.stock <= 0) {
      alert("Stock must be greater than 0.");
      return;
    }
    if (product.product_id.length != 9) {
      alert("Product ID must be exactly 9 digits long.");
      return;
    }
    if (product.supplier_id.length !== 3) {
      alert("Supplier ID must be exactly 3 digits long.");
      return;
    }

    // Using the code on https://apidog.com/blog/fetch-post-json/ below section "How to Fetch Post JSON Data" as a base and modified it to fit
    const response = await fetch("http://localhost:8071/insertProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(product),
      });
    // Reference ends here
    
    const data = await response.json();
    console.log(data);

    location.reload(); // Reloads the pages so that the table is refreshed

    alert(data.message); // Show alert with the response message
  };

  // Setting up the submit form (using css to format it)
  // When submitting the form, go to handleSubmit 
  // For the input, we can dynamically change the value on handleChange
  return (
    <div className="product-form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>  
        <div className="product-form-group">
          <label>Product Name:</label>
            <input
             type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
          </div>
        <div className="product-form-group">
          <label>Product ID:</label>
          <input
            type="text"
            name="product_id"
            value={product.product_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-form-group">
          <label>Stock:</label>
          <input
            type="number"
             name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
          </div>
        <div className="product-form-group">
          <label>Supplier ID:</label>
          <input
            type="text"
            name="supplier_id"
            value={product.supplier_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="product-submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
