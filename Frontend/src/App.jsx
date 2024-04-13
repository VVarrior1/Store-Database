import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Components/Products"; 
import Header from "./Components/Header";
import ProductForm from "./Components/ProductForm";
import DeleteForm from "./Components/DeleteForm";

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
              {<DeleteForm />}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
