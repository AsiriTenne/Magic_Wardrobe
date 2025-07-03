import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import login from "../Images/login.png";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Navbar } from "./Navbar"; // Import the Navbar component
import background from "../Images/herov3.jpg";

export const Signup = () => {
  const history = useHistory();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    if (!contactNumber) {
      setErrorMsg("Please enter a Contact Number.");
      return;
    }
    if (!address) {
      setErrorMsg("Please enter your address");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            Email: email,
            Password: password,
            ContactNumber: contactNumber,
            Address: address,
          })
          .then(() => {
            setSuccessMsg(
              "Signup Successful. You will now automatically get redirected to Login"
            );
            setFullname("");
            setEmail("");
            setPassword("");
            setContactNumber("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  const handleLoginClick = () => {
    history.push("/login");
  };
  const signupButtonStyle = {
    marginTop: "2%",
    backgroundColor: "black",
    color: "white",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover",
    maxWidth: "-webkit-fill-available"
  };
  const cardStyle = {
    width: "50%",
    padding: "20px",
  };
  const imageStyle = {
    display: "flex",
    justifyContent: "center",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container" style={containerStyle}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Sign Up
            </Typography>
            {successMsg && (
              <div className="success-msg" style={{ marginTop: "20px" }}>
                {successMsg}
              </div>
            )}
            <form
              className="form-group"
              autoComplete="off"
              onSubmit={handleSignup}
              style={formStyle}
            >
              <TextField
                id="fullname"
                label="Full Name"
                variant="standard"
                required
                onChange={(e) => setFullname(e.target.value)}
                value={fullName}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="standard"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                id="contactnumber"
                label="Contact Number"
                variant="standard"
                required
                onChange={(e) => setContactNumber(e.target.value)}
                value={contactNumber}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                id="address"
                label="Address"
                variant="standard"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                style={{ marginBottom: "20px" }}
              />
              <Button
                type="submit"
                variant="outlined"
                style={signupButtonStyle}
              >
                SIGN UP
              </Button>
            </form>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Already have an account? <Link to="/login">LOGIN</Link>
            </Typography>
            {errorMsg && (
              <div className="error-msg" style={{ marginTop: "20px" }}>
                {errorMsg}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
