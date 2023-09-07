// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./AccountDetails.css";
import {
  Typography,
  Grid,
  Button,
  Snackbar,
  IconButton,
  Link as MuiLink,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Define the AccountDetails functional component
const AccountDetails = () => {
  // State to store user details fetched from the server
  const [userDetails, setUserDetails] = useState({});

  // Navigate function to programmatically navigate to different routes
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user ID and email from session storage
    const storedUserId = sessionStorage.getItem("userId");
    const storedUserEmail = sessionStorage.getItem("userEmail");

    if (!storedUserId || !storedUserEmail) {
      // Handle the case when user ID or email is not available
      console.error("User ID or email is not available.");
      // You can add logic here to redirect to a login page or display an error message.
      return;
    }

    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        // Include the ID and Email in the query string
        const queryString = `?ID=${storedUserId}&Email=${storedUserEmail}`;

        const response = await fetch(
          `${process.env.GET_USER_BY_ID_API_URL}${queryString}`,
          {
            method: "GET",
            headers: {
              "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.data); // Set user details in state
        } else {
          // Handle error when fetching user details
          console.error("Error fetching user details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchUserDetails function when the component mounts
    fetchUserDetails();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // State to manage the Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State to manage the login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn") === "true"
  );

  // State to manage the confirmation dialog visibility
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    // Open the confirmation dialog when the "LOGOUT" button is clicked
    setIsLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    // Implement your logout logic here

    // Clear the user session data and update the state
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    setIsLoggedIn(false);

    // Close the confirmation dialog
    setIsLogoutDialogOpen(false);

    // Show the Snackbar message
    setSnackbarOpen(true);

    // Automatically close the Snackbar after 3 seconds and navigate to the /login page
    setTimeout(() => {
      setSnackbarOpen(false);
      navigate("/login"); // Navigate to the /login page
    }, 2800);
  };

  const handleCloseSnackbar = () => {
    // Close the Snackbar
    setSnackbarOpen(false);
  };

  const tableHeaderStyle = {
    fontSize: "16px",
    color: "darkblue",
  };

  const tableCellStyle = {
    fontSize: "16px",
    color: "green",
  };

  // Define the fields to hide in the table
  const fieldsToShow = ["Name", "Email", "Password", "Gender"];

  return (
    <div className="animated-text">
      <div className="account-details-container">
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          className="blue-text"
        >
          Account Details
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {/* Table for displaying user details */}
            <TableContainer component={Paper} classes={{ root: "full-width-table" }}>
              <Table>
                <TableBody>
                  {fieldsToShow.map((key) => (
                    <TableRow key={key}>
                      {/* Display field name */}
                      <TableCell style={tableHeaderStyle}>{key} - </TableCell>
                      <TableCell style={tableCellStyle}>
                        {/* Display user details, masking password */}
                        {key === "Password" ? (
                          <span>***********************************</span>
                        ) : (
                          userDetails[key]
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Reset Password link */}
                  <TableRow>
                    <TableCell style={tableHeaderStyle}>
                      Reset Password -{" "}
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                      <MuiLink
                        component="button"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Click here to reset your Password
                      </MuiLink>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Center the LOGOUT button within the grid */}
            <Grid container justifyContent="center">
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="logout-button"
                  style={{
                    marginTop: "50px",
                    width: "200px",
                    height: "50px",
                    fontSize: "23px",
                    background: "rgba(255, 99, 71, 0.8)",
                  }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* Snackbar for the logout message */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Paper
          elevation={3}
          style={{
            background: "lightgreen",
            color: "black",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            width: "550px",
            height: "40px",
            textAlign: "center",
          }}
        >
          <span>You have logged out successfully. Redirecting to the Login page...</span>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            minWidth: "400px",
            padding: "20px",
            backgroundColor: "lightyellow",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ color: "black" }}>
            Confirm Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "20px", textAlign: "center" }}
          >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setIsLogoutDialogOpen(false)}
            color="primary"
            style={{ color: "green", fontSize: "22px" }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="primary"
            autoFocus
            style={{ color: "darkred", fontSize: "22px" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Export the AccountDetails component for use in other parts of the application
export default AccountDetails;
