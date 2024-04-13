import React, { useState, useEffect } from "react";
import "./DeleteForm.css"; // Import the CSS file for styling

function TransactionsDelete() {
  const [transactions, setTransactions] = useState([]); // Holds the list of transactions fetched from the database
  const [transactionId, setTransactionId] = useState(""); // Holds the selected transaction ID for deletion

  // useEffect hook to fetch transactions from the database on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Make an HTTP GET request to fetch all transactions
        const response = await fetch("http://localhost:8071/transactions");
        const data = await response.json();
        setTransactions(data); // Store the fetched transactions in state
        if (data.length > 0) {
          // Automatically select the first transaction's ID as the default
          setTransactionId(data[0].transaction_id);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    // Update the transactionId state when the dropdown selection changes
    setTransactionId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    try {
      // Make an HTTP DELETE request to delete the selected transaction
      const response = await fetch(
        `http://localhost:8071/deleteTransaction/${transactionId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json(); // Parse the JSON response from the server
      console.log(data);

      window.location.reload(); // Optionally reloads the page to refresh the data

      alert(data.message); // Show an alert with the message from the server response
    } catch (error) {
      console.error("Error:", error); // Log any errors to the console
    }
  };

  return (
    <div className="delete-form-container">
      <h2>Delete Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="delete-form-group">
          <label>Transaction ID:</label>
          {/* Dropdown menu for selecting the transaction ID to delete */}
          <select
            name="transaction_id"
            value={transactionId}
            onChange={handleChange}
            required
          >
            {transactions.map((transaction) => (
              <option
                key={transaction.transaction_id}
                value={transaction.transaction_id}
              >
                Transaction ID: {transaction.transaction_id}
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
