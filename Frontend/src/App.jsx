import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Components/Products"; // Importing the Products component
import Header from "./Components/Header";
import ProductForm from "./Components/ProductForm";

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
            </>
          }
        />
        {/* Route to Products component when URL matches /products */}
        {/* Define other routes if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
