import React from "react";
import "./SellerFooter.css"; // Import the CSS file for styling

export const HomeFooter = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="/">All Items</a>
        <a href="#">Magic Wardrobe</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="footer-details">
        <p>Developed by Quad 200</p>
        <a href="/login-seller">Admin Login</a>
      </div>
    </div>
  );
};
