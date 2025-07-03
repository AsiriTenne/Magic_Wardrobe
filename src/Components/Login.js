import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import background from "../Images/herov3.jpg";
import { Navbar } from "./Navbar";
export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMsg(
          "Login Successful. You will now automatically get redirected to the Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/");
        }, 3000);
      })
      .catch((error) => setErrorMsg(error.message));
  };
  const handleSignupClick = () => {
    history.push("/signup");
  };
  const loginButtonStyle = {
    marginTop: "10%",
    backgroundColor: "black",
    color: "white",
  };
  const containerStyle = {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundPosition: "center",
    width: "100vw", // Changed to vw (viewport width)
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover", // Set to "cover" to fit the screen
    maxWidth: "-webkit-fill-available"


  };
  const cardStyle = {
    width: "50%",
    padding: "20px",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const imageStyle = {
    display: "flex",
    justifyContent: "center",
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0"; // Add this line
    document.body.style.padding = "0"; // Add this line
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
            <div style={imageStyle}></div>
            <Typography
              variant="h4"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Welcome Back!
            </Typography>
            <br />
            <br />
            <Typography
              variant="h6"
              align="center"
              style={{ marginBottom: "15px" }}
            >
              Login to continue
            </Typography>
            {successMsg && (
              <div className="success-msg" style={{ marginTop: "20px" }}>
                {successMsg}
              </div>
            )}
            <form
              className="form-group"
              autoComplete="off"
              onSubmit={handleLogin}
              style={formStyle}
            >
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ marginBottom: "20px" }}
              />
              <Button type="submit" variant="outlined" style={loginButtonStyle}>
                LOGIN
              </Button>
            </form>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Don't have an account? <Link to="/signup">SIGNUP</Link>
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
