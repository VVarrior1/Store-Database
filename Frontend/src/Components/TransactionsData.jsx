// Imports
import React, { useEffect, useState } from "react";
import "./Transactions.css"; // Importing the CSS file for styling

function Transactions() {
  const [data, setData] = useState([]); // State variable to hold product data

   // Fetching transaction data from the server 
  // Modified version of the code on https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side 
  // below "Client-side data fetching with useEffect".
  useEffect(() => {
    fetch("http://localhost:8071/transactions")
      .then((res) => res.json()) 
      .then((data) => setData(data)) 
  }, []); 

  // Setting up the table on frontend using css
  // Same code structure as ProductsData.jsx
  return (
    <div className="container">
      {" "}
  
      <table className="table">
        {" "}
        <thead>
          <tr>
            <th>Transaction ID</th>

            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Purchase Amount</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the transaction data to show each row */}
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.transaction_id}</td>
              <td>{d.customer_id}</td>
              <td>{d.customer_name}</td>
              <td>{d.purchase_amount}</td>
              <td>{d.product_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
