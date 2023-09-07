import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import "./BuyNow.css";

const BuyNow = () => {
  // State to store the fetched data from the API
  const [apiData, setApiData] = useState([]);
  
  // State to manage the visibility of the payment gateway message
  const [showPaymentGatewayMessage, setShowPaymentGatewayMessage] = useState(false);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");
  
      if (!userEmail) {
        // Handle the case when userEmail is not available
        console.error("User email is not available.");
        // You can add logic here to redirect to a login page or display an error message.
        return;
      }
  
      const response = await fetch(`${process.env.GET_CART_API_URL}?Email=${userEmail}`, {
        headers: {
          'Ocp-Apim-Subscription-Key':  process.env.SUBSCRIPTION_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const { data } = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  
  // Calculate the total price based on the fetched data
  const totalPrice = apiData.reduce((acc, item) => {
    const price = parseFloat(item.Price.replace(/[^\d.]/g, ""));
    return acc + price;
  }, 0);

  // Function to handle the "Pay Now" button click
  const handlePayNowClick = () => {
    // Toggle the visibility of the payment gateway message
    setShowPaymentGatewayMessage(!showPaymentGatewayMessage);
  };

  return (
    <div className="animated-text">
    <div className="buynow-container">
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        Billing Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong style={{ color: "#000080" }}>Name</strong>
              </TableCell>
              <TableCell>
                <strong style={{ color: "#000080" }}>Subject</strong>
              </TableCell>
              <TableCell>
                <strong style={{ color: "#000080" }}>Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Subject}</TableCell>
                <TableCell>{item.Price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total: ₹{totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "50px", width: '200px' }}
        onClick={handlePayNowClick}
      >
        Pay Now
      </Button>

      {showPaymentGatewayMessage && (
        <Typography variant="body2" style={{ marginTop: "30px" }}>
          The utilization of a payment gateway is exclusively accessible within
          the production environment only.
        </Typography>
      )}
    </div>
    </div>
  );
};

export default BuyNow;
