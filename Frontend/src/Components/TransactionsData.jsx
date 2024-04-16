import React, { useEffect, useState } from "react";
import "./Transactions.css"; // Importing the CSS file for styling

function Transactions() {
  const [data, setData] = useState([]); // State variable to hold product data

  // Fetching product data from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:8071/transactions") // Making a GET request to the server
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
            <th>Transaction ID</th>

            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Purchase Amount</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the product data to render each row */}
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
