import React from "react";
import TransactionsForm from "./TransactionsForm";
import TransactionsData from "./TransactionsData";
import TrasactionsDelete from "./TransactionsDelete";

const Transactions = () => {
  return (
    <div className="transactions">
      <TransactionsData />
      <div className="big-transactions-container">
        <TransactionsForm />
        <TrasactionsDelete />
      </div>
    </div>
  );
};

export default Transactions;
