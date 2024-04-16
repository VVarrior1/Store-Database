// Imports 
import React from "react";
import "./Home.css";

// Format for the main home [age ]
const Home = () => {
  return (
    <div className="home">
      <h2>
        {/* This is the title of the store which can be replaced to whatever */}
          Some Grocery Store (Name) 
      </h2>
      <div className="image-container">
        <img
          className="main-image"
          // This is from https://pngtree.com/freepng/shopping-mall-logo_5406131.html 
          src="https://png.pngtree.com/element_our/20200610/ourmid/pngtree-shopping-mall-logo-image_2235997.jpg"
          alt="storefront image"
        />
      </div>
    </div>
  );
};

export default Home;
