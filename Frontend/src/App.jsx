// Imports
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Transactions from "./Components/Transactions";
import Products from "./Components/Products";
import Home from "./Components/Home";
import Employees from "./Components/Employees";

// Routes to AppContent
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Has routes to the home, products and transactions page
function AppContent() {
  return (
    <>
      <Header className/>
      <Routes>
        <Route 
          // Path home is /
          path="/" 
          element={<Home />} 
        />
        <Route
          // Path to /products 
          path="/products"
          element={<Products />} 
        />
        <Route
        // Path to /transactions
          path="/transactions"
          element={
            <>
              <Transactions />
            </>
          }
        />
        <Route
        // Path to /employees
          path="/employees"
          element={
            <>
              <Employees />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
