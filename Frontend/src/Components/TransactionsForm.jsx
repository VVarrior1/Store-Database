import React, { useState } from 'react';
import './TransactionsForm.css'; // Import the CSS file for styling

function TransactionsForm() {
  const [transaction, setTransaction] = useState({
    customer_id: '',
    customer_name: '',
    purchase_amount: '',
    product_id: ''
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checks for the insert to make sure that the insert is putting in correct inputs 
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

    try {
      const response = await fetch('http://localhost:8071/insertTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      console.log(data);

      window.location.reload(); // Reloads the pages so that the table is refreshed
      
      alert(data.message); // Show a simple alert with the response message
       
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Setting up the submit form (using css to format/style it)
  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="transaction-form-group">
          <label>Customer ID:</label>
          <input type="text" name="customer_id" value={transaction.customer_id} onChange={handleChange} required />
        </div>
        <div className="transaction-form-group">
          <label>Customer Name:</label>
          <input type="text" name="customer_name" value={transaction.customer_name} onChange={handleChange} required />
        </div>
        <div className="transaction-form-group">
          <label>Purchase Amount:</label>
          <input type="number" name="purchase_amount" value={transaction.purchase_amount} onChange={handleChange} required />
        </div>
        <div className="transaction-form-group">
          <label>Product ID:</label>
          <input type="text" name="product_id" value={transaction.product_id} onChange={handleChange} required />
        </div>
        <button type="transaction-submit" className="transaction-add-button">Add</button>
      </form>
    </div>
  );
}

export default TransactionsForm;