import React from "react";

import "./SellerFooter.css"; // Import the CSS file for styling

export const SellerFooter = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="#">All inventory</a>
        <a href="/add-products">Add products</a>
        <a href="/report-dashboard">Generate reports</a>
      </div>
      <div></div>
      <div className="footer-details">
        <p>Developed by Quad 200</p>
      </div>
    </div>
  );
};
