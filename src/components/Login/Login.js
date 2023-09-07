import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.css";

const Login = () => {
  // State variables to manage email, password, and alert messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to show an alert with a message and severity
  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  // Event handler to close the alert
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Function to handle the login process
  const handleLogin = () => {
    // Trim email and password
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    // Define the API URL and subscription key
    const getUserApiUrl = process.env.GET_USER_API_URL;
    const subscriptionKey =  process.env.SUBSCRIPTION_KEY;
  
    // Create a query string with email and password
    const queryString = `?Email=${encodeURIComponent(
      trimmedEmail
    )}&Password=${encodeURIComponent(trimmedPassword)}`;
  
    // Perform a GET request to the API
    fetch(getUserApiUrl + queryString, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // If the response status is not OK, throw an error
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        if (data && data.data && data.data.ID) {
          // Extract the user's name from the response data
          const userName = data.data.Name;
  
          // Store the user ID and email in session storage
          sessionStorage.setItem("userLoggedIn", "true");
          sessionStorage.setItem("userId", data.data.ID);
          sessionStorage.setItem("userEmail", trimmedEmail);
  
          // Show a success alert
          showAlert(
            `${userName}, Login successful. Redirecting to the Home page ...`,
            "success"
          );
  
          // Navigate to the home page after showing the success alert
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          // If the response data is invalid, show an error alert
          showAlert("Invalid response data", "error");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error(error);
        showAlert(
          "Please enter the details of an existing GYANODAYA account.",
          "error"
        );
      });
  };

  return (
    <div className="animated-text">
      <div className="user-container">
        {/* Login Form */}
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "blue", marginBottom: "30px" }}
        >
          User Login ⚙️
        </Typography>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              style={{ marginBottom: "20px", height: "40px", fontSize: "20px" }}
            >
              Login
            </Button>
            <Typography
              variant="subtitle2"
              color="black"
              style={{
                marginTop: "20px",
                textAlign: "center",
                cursor: "default",
                fontSize: "18px",
              }}
            >
              {/* Forgot Password Link */}
              <MuiLink
                component={Link}
                to="/forgot-password"
                color="secondary"
                style={{ color: "red", fontSize: "20px" }}
              >
                Forgot Password ?
              </MuiLink>
              <br></br>
              or
              <br></br>
              don't have a GYANODAYA account?
            </Typography>
            {/* Create New Account Link */}
            <Link to="/create-account" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{
                  marginTop: "50px",
                  fontSize: "20px",
                  borderWidth: "2px",
                  backgroundColor: "lightyellow",
                }}
              >
                Create New Account
              </Button>
            </Link>
          </div>
        </form>
      </div>

      {/* Snackbar for displaying alerts */}
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={alertOpen}
        autoHideDuration={2800}
        onClose={handleCloseAlert}
      >
        <SnackbarContent
          sx={{
            color: "black",
            backgroundColor:
              alertSeverity === "error" ? "red" : "lightgreen",
            textAlign: "center",
            fontSize: "18px",
            width: "1000px", // Adjust the width as needed
            padding: "13px", // Adjust the padding as needed
          }}
          message={alertMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Login;
