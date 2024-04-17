// Imports
import React from "react";
import TransactionsForm from "./TransactionsForm";
import TransactionsData from "./TransactionsData";
import TrasactionsDelete from "./TransactionsDelete";

const Transactions = () => {
  return (
    // Setting up the page with Transactions Data and a contaienr for TransactionForm and TransactionDelete
    <div className = "transactions">
        <TransactionsData />
      <div className="big-transactions-container">
        <TransactionsForm />
        <TrasactionsDelete />
      </div>
    </div>
  );
};

export default Transactions;
