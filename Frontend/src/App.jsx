import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Components/Products"; 
import Header from "./Components/Header";
import ProductForm from "./Components/ProductForm";
import DeleteForm from "./Components/DeleteForm";
import UpdateForm from "./Components/UpdateForm";
import Transactions from "./Components/Transactions";
import TransactionsForm from "./Components/TransactionsForm";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/products"
          element={
            <>
              {<Products />}
              {<ProductForm />}
              {<UpdateForm />}
              {<DeleteForm />}
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              {<Transactions />}
              {<TransactionsForm />}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
