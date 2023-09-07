import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Cart.css";

const Cart = () => {
  // Function to navigate to the BuyNow page
  const handleBuyNow = () => {
    navigate("/buynow");
  };

  // Hook to enable navigation in the component
  const navigate = useNavigate();

  // State to store cart items fetched from the API
  const [cartItems, setCartItems] = useState([]);

  // State to store wishlist items fetched from the API
  const [wishlistItems, setWishlistItems] = useState([]);

  // Function to fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Retrieve the userEmail from session storage
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          // Handle the case when userEmail is not available
          console.error("User email is not available.");
          // You can add logic here to redirect to a login page or display an error message.
          return;
        }

        // Construct the URL for fetching cart items
        const getCart = `${process.env.GET_CART_API_URL}?Email=${userEmail}`;
        const apiKey = process.env.SUBSCRIPTION_KEY;

        // Fetch cart items from the API
        const response = await fetch(getCart, {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const { data } = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchWishlistItems = async () => {
      try {
        // Retrieve the userEmail from session storage
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          // Handle the case when userEmail is not available
          console.error("User email is not available.");
          // You can add logic here to redirect to a login page or display an error message.
          return;
        }

        // Construct the URL for fetching wishlist items
        const getWishlist = `${process.env.GET_WISHLIST_API_URL}?Email=${userEmail}`;
        const apiKey = process.env.SUBSCRIPTION_KEY;

        // Fetch wishlist items from the API
        const response = await fetch(getWishlist, {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const { data } = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    // Fetch cart and wishlist items when the component mounts
    fetchCartItems();
    fetchWishlistItems();
  }, []);

  // Function to generate a random background color for cards
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

  // Function to toggle an item in the wishlist
  const toggleWishlist = async (item) => {
    if (!isItemInWishlist(item)) {
      // Add to Wishlist
      const addToWishlistApi = process.env.CREATE_WISHLIST_API_URL;
      const apiKey = process.env.SUBSCRIPTION_KEY;

      try {
        // Retrieve the userEmail from session storage
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          // Handle the case when userEmail is not available
          console.error("User email is not available.");
          // You can add logic here to redirect to a login page or display an error message.
          return;
        }

        // Send a POST request to add the item to the wishlist
        const response = await fetch(addToWishlistApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey,
          },
          body: JSON.stringify({
            ID: item.ID,
            Name: item.Name,
            Price: item.Price,
            Subject: item.Subject,
            Email: userEmail, // Include userEmail in the request body
          }),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      // Remove from Wishlist
      const removeFromWishlistApi = `${process.env.REMOVE_FROM_WISHLIST_API_URL}?ID=${item.ID}`;
      const apiKey = process.env.SUBSCRIPTION_KEY;

      try {
        // Retrieve the userEmail from session storage
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          // Handle the case when userEmail is not available
          console.error("User email is not available.");
          // You can add logic here to redirect to a login page or display an error message.
          return;
        }

        // Send a DELETE request to remove the item from the wishlist
        const response = await fetch(
          `${removeFromWishlistApi}&Email=${userEmail}`,
          {
            method: "DELETE",
            headers: {
              "Ocp-Apim-Subscription-Key": apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }

    // Toggle the item in the wishlist
    setWishlistItems((prevItems) =>
      isItemInWishlist(item)
        ? prevItems.filter((wishlistItem) => wishlistItem.ID !== item.ID)
        : [...prevItems, item]
    );
  };

  // Function to check if an item is in the wishlist
  const isItemInWishlist = (item) =>
    wishlistItems.some((wishlistItem) => wishlistItem.ID === item.ID);

  // Function to remove an item from the cart
  const removeFromCart = async (item) => {
    const deleteCartItemApi = `${process.env.REMOVE_FROM_CART_API_URL}?ID=${item.ID}`;
    const apiKey = process.env.SUBSCRIPTION_KEY;

    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");

      if (!userEmail) {
        // Handle the case when userEmail is not available
        console.error("User email is not available.");
        // You can add logic here to redirect to a login page or display an error message.
        return;
      }

      // Send a DELETE request to remove the item from the cart
      const response = await fetch(`${deleteCartItemApi}&Email=${userEmail}`, {
        method: "DELETE",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      // Remove the item from the cart
      setCartItems((prevItems) =>
        prevItems.filter((cartItem) => cartItem.ID !== item.ID)
      );
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  // Function to get the total number of wishlist items
  const getTotalWishlistItems = () => wishlistItems.length;

  return (
    <div className="cart-container">
      <div className="animated-text">
        <Typography variant="h2" className="cart-heading">
          Cart 🛒
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="h6" className="empty-message">
            Your shopping cart currently does not contain any items.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item key={item.ID} xs={12} sm={6} md={4}>
                <Card
                  className="cart-item-card"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontWeight: "bold", fontSize: "20px" }}
                    >
                      Price: {item.Price}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "#000080" }}
                    >
                      Subject: {item.Subject}
                    </Typography>
                    <Button
                      variant="contained"
                      color={isItemInWishlist(item) ? "secondary" : "primary"}
                      onClick={() => toggleWishlist(item)}
                      style={{
                        width: "250px",
                        marginTop: "20px",
                        marginRight: "150px",
                      }}
                    >
                      {isItemInWishlist(item)
                        ? "Remove From Wishlist 💖"
                        : "Add To Wishlist 💖"}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => removeFromCart(item)}
                      style={{ width: "250px", marginTop: "20px" }}
                    >
                      Remove From Cart 🛒
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* "Buy-Now" button */}
            <Grid item xs={12}>
              <div
                className="buy-now-button-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  className="buy-now-button"
                  color="primary"
                  onClick={handleBuyNow}
                >
                  💰 Buy Now 💰
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </div>

      {/* Wishlist icon */}
      <Link to="/wishlist" className="wishlist-link">
        <div className="wishlist-icon">
          <Badge badgeContent={getTotalWishlistItems()} color="secondary">
            <FavoriteIcon fontSize="large" />
          </Badge>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
