// Imports
import React, { useEffect, useState } from "react";
import "./Products.css";

function ProductsData() {
  const [data, setData] = useState([]); // State variable to hold product data

  // Fetching product data from the server 
  // Modified version of the code on https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side 
  // below "Client-side data fetching with useEffect".
  useEffect(() => {
    fetch("http://localhost:8071/products") 
      .then((res) => res.json()) 
      .then((data) => setData(data))  
  }, []); 

  // Setting up the table on frontend using css
  return (
    <div className="container">
      {" "}
      <table className="table">
        {" "}
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Stock</th>
            <th>Supplier ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the product data to show each row */}
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

export default ProductsData;
