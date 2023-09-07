import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./ServiceCart.css";

// Function to generate a random background color from a predefined list
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

// ServiceCart component receives technology and description as props
const ServiceCart = ({ technology, description }) => {
  // Generate a random background color for the card
  const backgroundColor = getRandomColor();

  return (
    <div className="animated-text">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Card to display technology and description */}
        <Card
          className="animated-card"
          style={{ backgroundColor, marginBottom: "16px" }}
        >
          <CardContent>
            {/* Display the technology with a blue color */}
            <Typography
              variant="h6"
              component="div"
              style={{ color: "blue", fontSize: "21px" }}
            >
              Technology : {technology}
            </Typography>
            {/* Display the description with a black color */}
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ color: "black", fontSize: "17px" }}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCart;
