// Import
import React, { useState, useEffect } from "react";
import "./DeleteForm.css";

// Learned hangleChange and handleSubmit through https://www.w3schools.com/react/react_forms.asp
function TransactionsDelete() {
  const [transactions, setTransactions] = useState([]); // Holds the list of transactions 
  const [transactionId, setTransactionId] = useState(""); // Holds the selected transaction ID 

  // Same code structure as fetchProducts in DeleteForm.jsx
  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:8071/transactions");
    const data = await response.json();
    setTransactions(data); // Store the fetched transactions
    if (data.length > 0) {
      // Select the first transactions's ID as the default if data.length is not nothing
      setTransactionId(data[0].transaction_id);
    }
  };

  // Same structure as the useEffect in DeleteForm.jsx
  useEffect(() => {
    // Fetch transactions from the backend (used in the dropdown menu )
    fetchTransactions();
  }, []);

  const handleChange = (event) => {
    // Update the transactionId state when the dropdown selection changes
    setTransactionId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Modified code that is based on https://apidog.com/blog/fetch-post-json/ below "How to Fetch Post JSON Data" as a base and modified it to fit
    // Same structure as DeleteForm.jsx
    const response = await fetch(
      `http://localhost:8071/deleteTransaction/${transactionId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json(); 
    console.log(data);

    location.reload(); // Reloads the page to refresh data

    alert(data.message);// Show an alert with response message
  };

  // Setting up he transaction delete form (using css to format it)
  // When submitting the form, go to handleSubmit
  return (
    <div className="delete-form-container">
      <h2>Delete Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="delete-form-group">
          <label>Transaction ID:</label>
          {/* Dropdown menu for selecting the transaction ID to delete */}
          {/* Select part is the same as DeleteForm.jsx */}
          <select
            name="transaction_id"
            value={transactionId}
            onChange={handleChange}
            required
          >
             {/* Gets the transaction_id from transaction as the key and value for the dropdown menu, below that is the format of the label */}
            {transactions.map((transaction) => (
              <option
                key={transaction.transaction_id} value={transaction.transaction_id}>
                Transaction ID: {transaction.transaction_id} , Name: {transaction.customer_name}
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

export default TransactionsDelete;
