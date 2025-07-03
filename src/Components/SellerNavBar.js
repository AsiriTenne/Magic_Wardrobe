import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../Images/matchy.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";
import "./NavBar.css";

export const SellerNavBar = ({ user, totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="navbar">
      <div className="leftside">
        <div className="logo">
          <Link className="navlink" to="/seller-shop">
            <img src={logo2} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="centered-links">
        <div>
          <Link
            className="navlink"
            to="/seller-shop"
            style={{ color: "white" }}
          >
            All Inventory
          </Link>
        </div>
        <div>
          <Link
            className="navlink"
            to="/add-products"
            style={{ color: "white" }}
          >
            Add Products
          </Link>
        </div>
        <div>
          <Link
            className="navlink"
            to="/report-dashboard"
            style={{ color: "white" }}
          >
            Generate Reports
          </Link>
        </div>
      </div>
      <div className="rightside">
        <div></div>
        <div></div>
        <div></div>
        <Link to="/login-seller">
          <div className="logout-button" style={{ textDecoration: "none" }}>
            LOGOUT
          </div>
        </Link>
      </div>
    </div>
  );
};
