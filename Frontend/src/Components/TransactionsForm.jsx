// Import 
import React, { useState } from "react";
import "./TransactionsForm.css"; 

// Small functino which creates a random ID between 100000000 to 999999999
function generateRandomId() {
  const min = 100000000; // Smallest 9-digit number since if we have a 0 in the front, it will result in a value of 0.
  const max = 999999999; // Largest 9-digit number
  // This code line below comes from: https://www.geeksforgeeks.org/how-to-generate-random-number-in-react-js/ on the first example on the function "randomNumberInRange"
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Learned hangleChange and handleSubmit through https://www.w3schools.com/react/react_forms.asp
function TransactionsForm() {
  // setTransaction can be used to update the state of the transaction table 
  const [transaction, setTransaction] = useState({
    transaction_id: generateRandomId(),
    customer_id: "",
    customer_name: "",
    purchase_amount: "",
    product_id: "",
  });

  // Updaets the state of transaction with the value inputed
  // Structure is the same as the handleChange in ProductForm.jsx
  const handleChange = (event) => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Checks for the insert to make sure that the insert is putting in correct inputs
    if (transaction.purchase_amount <= 0) {
      alert("You need to buy something.");
      return;
    }
    if (transaction.customer_id.length != 7) {
      alert("Customer ID must be exactly 7 digits long.");
      return;
    }
    if (transaction.product_id.length !== 9) {
      alert("Product ID must be exactly 9 digits long.");
      return;
    }

    // Using the code on https://apidog.com/blog/fetch-post-json/ below "How to Fetch Post JSON Data" as a base and modified it to fit
    // Structure the same as in ProductForm.jsx
    const response = await fetch("http://localhost:8071/insertTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    // Reference ends here 

    const data = await response.json();
    console.log(data);

    location.reload(); // Reloads the pages so that the table is refreshed

    alert(data.message); // Show alert with the response message
    
  };

  // Setting up the submit form (using css to format/style it)
  // When submitting the form, go to handleSubmit 
  // For the input, we can dynamically change the value on handleChange
  // Same structure as the return on ProductForm.jsx
  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="transaction-form-group">
          <label>Transaction ID:</label>
          <input
            type="text"
            name="transaction_id"
            value={transaction.transaction_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="transaction-form-group">
          <label>Customer ID:</label>
          <input
            type="text"
            name="customer_id"
            value={transaction.customer_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="transaction-form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            name="customer_name"
            value={transaction.customer_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="transaction-form-group">
          <label>Purchase Amount:</label>
          <input
            type="number"
            name="purchase_amount"
            value={transaction.purchase_amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="transaction-form-group">
          <label>Product ID:</label>
          <input
            type="text"
            name="product_id"
            value={transaction.product_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="transaction-submit" className="transaction-add-button">
          Add
        </button>
      </form>
    </div>
  );
}

export default TransactionsForm;
