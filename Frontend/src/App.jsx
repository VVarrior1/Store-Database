import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProductsData from "./Components/ProductsData";
import Header from "./Components/Header";
import ProductForm from "./Components/ProductForm";
import DeleteForm from "./Components/DeleteForm";
import UpdateForm from "./Components/UpdateForm";
import Transactions from "./Components/Transactions";
import TransactionsForm from "./Components/TransactionsForm";
import Products from "./Components/Products";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // This hook returns the location object that represents the current URL

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products key={location.key} />} // Unique key forces remount on route change
        />
        <Route
          path="/transactions"
          element={
            <>
              <Transactions key={location.key} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
