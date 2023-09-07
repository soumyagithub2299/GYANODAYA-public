import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import './ForgotPassword.css';

const ForgotPassword = () => {
  // State variables
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const navigate = useNavigate();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle new password input change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle confirm new password input change
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  // Function to show an alert
  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  // Handle close alert action
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Validate password format
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle click on the "Check Email" button
  const handleCheckEmailClick = async () => {
    try {
      // Simulate API request to check user existence (replace with actual API call)
      const getUserApiUrl = process.env.VARIFY_USER_API_URL;
      const subscriptionKey = process.env.SUBSCRIPTION_KEY;

      const response = await fetch(`${getUserApiUrl}?Email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      });

      if (!response.ok) {
        // If the API response is not OK, handle the error (user not found)
        showAlert('User does not exist', 'error');
        return;
      }

      // If the API responds successfully, proceed to step 2
      setStep(2);
    } catch (error) {
      console.error('Error checking user existence:', error);
      // Handle other errors here
    }
  };

  // Handle click on the "Reset Password" button
  const handleResetPasswordClick = async () => {
    if (!validatePassword(newPassword) || newPassword !== confirmNewPassword) {
      showAlert('Password does not meet the requirements or does not match.', 'error');
      return;
    }

    try {
      const updatePasswordApiUrl = `${process.env.UPDATE_PASSWORD_API_URL}?Email=${encodeURIComponent(email)}`;
      const sendEmailForUpdatedPasswordApiUrl = process.env.SEND_EMAIL_FOR_UPDATED_PASSWORD_API_URL;
      const subscriptionKey = process.env.SUBSCRIPTION_KEY;

      const passwordRequestBody = {
        Password: newPassword, // Use the new password entered in step 2
        ConfirmPassword: confirmNewPassword, // Use the confirm new password entered in step 2
      };

      // Make the PATCH request to update the password
      const passwordResponse = await fetch(updatePasswordApiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify(passwordRequestBody),
      });

      // Check the response for the PATCH request
      if (!passwordResponse.ok) {
        showAlert('Failed to reset password. Please try again later.', 'error');
        return;
      }

      // Make the GET request to update the email
      const emailResponse = await fetch(`${sendEmailForUpdatedPasswordApiUrl}?Email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      });

      // Check the response for the GET request
      if (!emailResponse.ok) {
        showAlert('Failed to update email. Please try again later.', 'error');
        return;
      }

      // If both API calls respond successfully, show success alert and navigate to the home page
      showAlert('Password updated successfully. Redirecting to the home page...', 'success');

      // Navigate to the home page after showing the success alert
      setTimeout(() => {
        navigate('/');
      }, 2800);
    } catch (error) {
      console.error('Error resetting password or updating email:', error);
      // Handle other errors here
    }
  };

  return (
    <div className="animated-text">
      <div className="forgot-password-container">
        <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
          Reset Password
        </Typography>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckEmailClick}
              fullWidth
              style={{ marginTop: '30px' }}
            >
              Check User
            </Button>
          </>
        )}

        {/* Step 2: Enter New Password */}
        {step === 2 && (
          <>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              margin="normal"
              disabled={true} // Make email field read-only
            />
            <TextField
              label="Enter New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              margin="normal"
              error={!validatePassword(newPassword)}
              helperText={
                !validatePassword(newPassword)
                  ? 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.'
                  : ''
              }
            />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              margin="normal"
              error={newPassword !== confirmNewPassword}
              helperText={
                newPassword !== confirmNewPassword ? 'Passwords do not match' : ''
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPasswordClick}
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Reset Password
            </Button>
          </>
        )}

        {/* Snackbar for displaying alerts */}
        <Snackbar
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          open={alertOpen}
          autoHideDuration={2800}
          onClose={handleCloseAlert}
        >
          <SnackbarContent
            sx={{
              color: 'black',
              backgroundColor: alertSeverity === 'error' ? 'red' : 'lightgreen',
              textAlign: 'center',
              fontSize: '18px',
              width: '1000px',
              padding: '13px',
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
    </div>
  );
};

export default ForgotPassword;
