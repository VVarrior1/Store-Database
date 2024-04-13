import React, { useEffect, useState } from "react";
import "./Products.css"; // Importing the CSS file for styling

function Products() {
  const [data, setData] = useState([]); // State variable to hold product data

  // Fetching product data from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:8071/products") // Making a GET request to the server
      .then((res) => res.json()) // Parsing the JSON response
      .then((data) => setData(data)) // Setting the retrieved data in the state
      .catch((err) => console.log(err)); // Handling any errors that occur during the request
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Rendering the component
  return (
    <div className="container">
      {" "}
      {/* Using a class from products.css for styling */}
      <table className="table">
        {" "}
        {/* Using a class from products.css for styling */}
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Stock</th>
            <th>Supplier ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the product data to render each row */}
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.product_name}</td>
              <td>{d.product_id}</td>
              <td>{d.stock}</td>
              <td>{d.supplier_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
