import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../Images/matchy.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";
import "./NavBar.css";
export const Navbar = ({ user, totalProducts }) => {
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
          <Link className="navlink" to="/">
            <img src={logo2} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="centered-links">
        <div>
          <Link className="navlink" to="/" style={{ color: "white" }}>
            All Items
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/wardrobe" style={{ color: "white" }}>
            Magic Wardrobe
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/" style={{ color: "white" }}>
            About Us
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/" style={{ color: "white" }}>
            Contact Us
          </Link>
        </div>
      </div>
      <div className="rightside">
        {!user && (
          <>
            <div>
              <Link className="navlink" to="signup" style={{ color: "white" }}>
                SIGN UP
              </Link>
            </div>
            <div>
              <Link className="navlink" to="login" style={{ color: "white" }}>
                LOGIN
              </Link>
            </div>
          </>
        )}
        {user && (
          <>
            <div>
              <Link
                className="navlink"
                to="/profile"
                style={{
                  color: "white",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                Hi, {user}
              </Link>
            </div>
            <div></div>
            <div className="cart-menu-btn">
              <Link className="navlink" to="cart">
                <Icon icon={shoppingCart} size={20} className="white-icon"/>
              </Link>
              <span className="cart-indicator">{totalProducts}</span>
            </div>
            <div></div>
            <div></div>
            <div onClick={handleLogout} className="logout-button">
              LOGOUT
            </div>
          </>
        )}
      </div>
    </div>
  );
};
