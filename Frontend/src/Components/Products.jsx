// Imports 
import React from "react";
import ProductsData from "./ProductsData";
import ProductForm from "./ProductForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";
import "./Products.css";

const Products = () => {
  return (
    // This shows us the table while 'big-container' shows the three forms to insert, update, and delete product
    <div className="container">
      <ProductsData />
  
      <div className="big-container">
        <ProductForm />
        <UpdateForm />
        <DeleteForm />
      </div>
    </div>
  );
};

export default Products;
