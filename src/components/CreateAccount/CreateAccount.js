import React, { useState } from "react";
import "./CreateAccount.css";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  // State variables to manage user input and form validation
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isMatchingPassword, setIsMatchingPassword] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // Step and messages for email verification
  const [step, setStep] = useState(1);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Snackbar alerts
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Verification success and failure alerts
  const [isVerificationSuccessAlertOpen, setIsVerificationSuccessAlertOpen] =
    useState(false);
  const [verificationSuccessMessage, setVerificationSuccessMessage] =
    useState("");
  const [isVerificationFailureAlertOpen, setIsVerificationFailureAlertOpen] =
    useState(false);
  const [verificationFailureMessage, setVerificationFailureMessage] =
    useState("");

  // Local state to track user login status
  const [, setIsLoggedIn] = useState(false);

  // Function to validate an email using a regular expression
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate a password using a regular expression
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Event handler for email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  // Event handler for the "Verify Email" button click
  const handleVerifyButtonClick = async () => {
    if (isEmailValid) {
      try {
        // Define the URL for the GET request to check if the email exists
        const checkEmailExistsUrl = `${process.env.CHECK_EMAIL_EXISTS_API_URL}?Email=${email}`;
        const apiKey = process.env.SUBSCRIPTION_KEY;

        // Make the GET request to check if the email exists
        const checkEmailExistsResponse = await fetch(checkEmailExistsUrl, {
          method: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        });

        if (checkEmailExistsResponse.ok) {
          // Email is unique, proceed to step 2
          setStep(2);
          setVerificationMessage(
            "Please check your email for OTP and email verification. Enter the OTP below to verify."
          );
          setUserEmail(email);

          // Send OTP email here (You may need to implement this part)
        } else {
          // Email already exists, show an alert
          setSnackbarMessage(
            "Email already exists. Please enter another email."
          );
          setIsSnackbarOpen(true);
        }
      } catch (error) {
        console.error("An error occurred while making the API request:", error);
      }
    }
  };

  // Event handler for OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Event handler for the "Confirm OTP" button click
  const handleConfirmOtpButtonClick = async () => {
    const trimmedOtp = otp.trim();

    try {
      // Define the URL for the GET request to confirm OTP
      const confirmOtpApiUrl = `${process.env.CONFIRM_OTP_API_URL}?Email=${userEmail}&OTP=${trimmedOtp}`;
      const apiKey = process.env.SUBSCRIPTION_KEY;

      // Make the GET request to confirm OTP
      const response = await fetch(confirmOtpApiUrl, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
      });

      if (response.ok) {
        setStep(3);
        setVerificationSuccessMessage("Email verified successfully.");
        setIsVerificationSuccessAlertOpen(true);

        // Close the success alert after 3 seconds
        setTimeout(() => {
          setIsVerificationSuccessAlertOpen(false);
        }, 2800);
      } else {
        setVerificationFailureMessage(
          "Please enter the correct OTP. OTP doesn't match."
        );
        setIsVerificationFailureAlertOpen(true);
      }
    } catch (error) {
      console.error("An error occurred while making the API request:", error);
    }
  };

  // Event handler for name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  // Event handler for confirm password input change
  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    setIsMatchingPassword(newPassword === password);
  };

  // Event handler for gender radio button change
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Event handler for the "Create" button click
  const handleCreateAccount = async () => {
    if (isPasswordValid && isMatchingPassword && name && gender) {
      setIsFormValid(true);

      const createUserApiUrl = process.env.CREATE_USER_API_URL;
      const apiKey = process.env.SUBSCRIPTION_KEY;
      const sendEmailForNewAccountApiUrl = `${
        process.env.SEND_EMAIL_FOR_NEW_ACCOUNT_API_URL
      }?Email=${encodeURIComponent(userEmail)}&Name=${encodeURIComponent(
        name
      )}`;

      const requestBody = {
        Email: userEmail,
        Name: name,
        Password: password,
        ConfirmPassword: confirmPassword,
        Gender: gender,
      };

      try {
        // Make the POST request to create the user
        const response = await fetch(createUserApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey,
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          // Make the POST request with userEmail and Name as query parameters
          const createUserEmailResponse = await fetch(
            sendEmailForNewAccountApiUrl,
            {
              method: "POST",
              headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
              },
            }
          );

          if (createUserEmailResponse.ok) {
            // Store the user ID and email in sessionStorage
            const responseData = await response.json();
            const userId = responseData.data.ID;
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("userEmail", userEmail);

            setSnackbarMessage(
              "User created successfully. Redirecting to the home page..."
            );
            setIsSnackbarOpen(true);
            setIsLoggedIn(true);
            sessionStorage.setItem("userLoggedIn", "true");

            // Redirect to the home page after a delay
            setTimeout(() => {
              navigate("/");
            }, 2800);
          } else {
            console.error(
              "API request failed:",
              createUserEmailResponse.statusText
            );
          }
        } else {
          console.error("API request failed:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while making the API request:", error);
      }
    } else {
      setIsFormValid(false);
    }
  };

  // Event handler to close the Snackbar alert
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="animated-text">
      <div className="create-account-container">
        <Typography variant="h4" style={{ textAlign: "center", color: "blue" }}>
          Create Account
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!isEmailValid}
          helperText={!isEmailValid ? "Enter a valid email address" : ""}
          disabled={step !== 1}
          margin="normal"
        />
        {/* Verify Email Button */}
        {step === 1 && (
          <Button
            variant="outlined"
            onClick={handleVerifyButtonClick}
            margin="normal"
          >
            Verify Email
          </Button>
        )}
        {/* OTP Input and Confirm OTP Button */}
        {step === 2 && (
          <>
            <p>{verificationMessage}</p>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ min: 100000, max: 999999 }}
              margin="normal"
            />
            <Button
              variant="outlined"
              onClick={handleConfirmOtpButtonClick}
              margin="normal"
            >
              Confirm OTP
            </Button>
          </>
        )}
        {/* Name, Password, Confirm Password, and Gender Input */}
        {step === 3 && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={handleNameChange}
              margin="normal"
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
              error={!/^[A-Za-z ]+$/.test(name)}
              helperText={
                !/^[A-Za-z ]+$/.test(name)
                  ? "Only letters and spaces are allowed"
                  : ""
              }
            />
            <TextField
              label="Create Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!isPasswordValid}
              helperText={
                !isPasswordValid
                  ? "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
                  : ""
              }
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!isMatchingPassword}
              helperText={!isMatchingPassword ? "Passwords do not match" : ""}
              margin="normal"
            />
            <FormControl component="fieldset" style={{ marginTop: 16 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                row
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                  style={{ marginRight: "50px" }}
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                  style={{ marginRight: "50px" }}
                />
                <FormControlLabel
                  value="Others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
            </FormControl>

            {/* Create Button */}
            <Button
              variant="outlined"
              onClick={handleCreateAccount}
              style={{
                marginTop: "30px",
                width: "170px",
                height: "43px",
                background: "lightgreen",
                fontSize: "20px",
                borderRadius: "11px",
              }}
            >
              Create
            </Button>
          </>
        )}
      </div>

      {/* Snackbar Alerts */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2800}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "lightgreen",
            color: "black",
          },
        }}
      />
      <Snackbar
        open={isVerificationSuccessAlertOpen}
        autoHideDuration={2800}
        onClose={() => setIsVerificationSuccessAlertOpen(false)}
        message={verificationSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "lightgreen",
            color: "black",
          },
        }}
      />
      <Snackbar
        open={isVerificationFailureAlertOpen}
        autoHideDuration={2800}
        onClose={() => setIsVerificationFailureAlertOpen(false)}
        message={verificationFailureMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "red",
            color: "white",
          },
        }}
      />

      {/* Confirmation message for successful user creation */}
      {isFormValid && (
        <Typography variant="h5">
          User created successfully. You are now logged in.
        </Typography>
      )}
    </div>
  );
};

export default CreateAccount;
