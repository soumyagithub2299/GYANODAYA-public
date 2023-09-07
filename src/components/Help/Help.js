import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

import './Help.css';

// Frequently Asked Questions (FAQs) data
const FAQs = [
  {
    question: 'Can I access courses on mobile devices and tablets?',
    answer: 'Absolutely! Our platform is fully responsive and mobile-friendly. You can access courses on smartphones, tablets, and desktop computers.',
  },
  {
    question: 'Do you offer discounts or promotions on courses?',
    answer: 'Yes, we frequently offer discounts and promotions. Check our "Special Offers" or "Promotions" page to see the latest deals and discounts available.',
  },
  {
    question: 'How long do I have access to a course after purchase?',
    answer: 'You typically have lifetime access to a course after purchase. This means you can revisit the course material whenever you like, even after completing it.',
  },
  {
    question: 'What is your content quality assurance process?',
    answer: 'We ensure the quality of our courses through a rigorous review process. Our team of experts evaluates course content to ensure it meets our high standards for accuracy and relevance.',
  },
  {
    question: 'What payment methods are accepted on your website?',
    answer: 'We accept all major credit and debit cards, PayPal, and other secure payment methods. You can view the full list of accepted payment options during the checkout process.',
  },
  // Add more FAQs here
];

// Function to get a random color for FAQ cards
const getRandomColor = () => {
  const lightColors = [
    "#FFD1DC",
    "#FFF700",
    "#87CEEB",
    "#D3D3D3",
    "#FFA07A",
    "#98FB98",
    "#DDA0DD",
    "#FFE4B5",
    "#87CEFA",
    "#F0E68C",
    "#FFB6C1",
    "#E0FFFF",
    "#FFD700",
  ];
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};

const Help = () => {
  // State for the user's query
  const [query, setQuery] = useState('');

  // States for Snackbar (alerts)
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isQueryEmptyAlertOpen, setQueryEmptyAlertOpen] = useState(false);
  const [isNotLoggedInAlertOpen, setNotLoggedInAlertOpen] = useState(false);

  // Function to handle sending a user's query
  const handleSendQuery = async () => {
    // Check if the query is empty
    if (query.trim() === '') {
      setQueryEmptyAlertOpen(true);
      return;
    }

    // Check if the user is logged in
    const isUserLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

    if (!isUserLoggedIn) {
      // User is not logged in, show an alert
      setNotLoggedInAlertOpen(true);
      return;
    }

    // Get the user's email from session data
    const userEmail = sessionStorage.getItem("userEmail");

    try {
      // Replace with the actual API URL and subscription key
      const createQueryApiUrl = process.env.CREATE_QUERY_API_URL;
      const apiKey = process.env.SUBSCRIPTION_KEY;

      // Send the query data to the API
      const response = await axios.post(
        createQueryApiUrl,
        { Query: query, Email: userEmail },
        {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
          },
        }
      );

      if (response.status === 200) {
        // Show a success Snackbar and clear the query
        setSnackbarOpen(true);
        setQuery('');
      }
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  // Function to handle closing the Snackbar (success alert)
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Function to handle closing the query empty alert
  const handleCloseQueryEmptyAlert = () => {
    setQueryEmptyAlertOpen(false);
  };

  // Function to handle closing the not logged in alert
  const handleCloseNotLoggedInAlert = () => {
    setNotLoggedInAlertOpen(false);
  };

  return (
    <div className="animated-text">
      <div className="help-container">
        <Typography variant="h4" gutterBottom style={{ color: 'blue', textAlign: 'center' }}>
          How may I help you? 💁
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: '15px', textAlign: 'left' }}>
          Have a question or need help? Ask us:
        </Typography>

        {/* Input field for user's query */}
        <TextField
          label="Your Question ?"
          variant="outlined"
          fullWidth
          multiline
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendQuery}
          >
            Send
          </Button>
        </div>

        {/* Snackbar for query empty alert */}
        <Snackbar
          open={isQueryEmptyAlertOpen}
          autoHideDuration={2800}
          onClose={handleCloseQueryEmptyAlert}
        >
          <MuiAlert
            onClose={handleCloseQueryEmptyAlert}
            severity="error"
            sx={{
              backgroundColor: 'white',
              color: 'red',
              width: '500px',
              height: '60px',
              fontSize: '20px',
            }}
          >
            Please enter your query.
          </MuiAlert>
        </Snackbar>

        {/* Snackbar for not logged in alert */}
        <Snackbar
          open={isNotLoggedInAlertOpen}
          autoHideDuration={2800}
          onClose={handleCloseNotLoggedInAlert}
        >
          <MuiAlert
            onClose={handleCloseNotLoggedInAlert}
            severity="warning"
            sx={{
              backgroundColor: 'white',
              color: 'orange',
              width: '500px',
              height: '60px',
              fontSize: '20px',
            }}
          >
            Please log in to send your query.
          </MuiAlert>
        </Snackbar>

        {/* FAQ section */}
        <hr style={{ width: '60%', marginTop: '60px', margin: '20px auto', height: '1px', border: 'none', backgroundColor: 'red' }} />

        {/* Forgot Password link */}
        <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
          <span className="forgot-password-text" style={{ fontSize: '28px', color: 'red' }}>→ →  → Forgot Password? </span>
          <Link to="/forgot-password" style={{ fontSize: '18px', cursor: 'pointer' }}>Click here to reset it</Link>
        </Typography>

        <hr style={{ width: '60%', marginBottom: '30px', margin: '20px auto', height: '1px', border: 'none', backgroundColor: 'red' }} />

        {/* List of FAQs */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '15px', textAlign: 'left' }}>
          FAQ's :
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={2} style={{ maxWidth: '90%' }}>
            {FAQs.map((faq, index) => (
              <Grid item xs={12} sm={12} key={index}>
                {/* FAQ Card */}
                <Card style={{ backgroundColor: getRandomColor() }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Question: {faq.question}
                    </Typography>
                    <Typography variant="body1">
                      Our Answer: {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      {/* Snackbar for successful query submission */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={2800}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              backgroundColor: 'white',
              color: 'blue',
              width: '500px',
              height: '60px',
              fontSize: '20px',
            }}
          >
            Your Query has been sent successfully!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Help;
