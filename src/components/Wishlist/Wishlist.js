import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Wishlist.css";

const Wishlist = () => {
  // State to store wishlist items and cart items
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Fetch wishlist and cart items when the component mounts
  useEffect(() => {
    // Function to fetch cart items
    const fetchCartItems = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail");
        const getCart = `${process.env.GET_CART_API_URL}?Email=${userEmail}`;
        const apiKey = process.env.SUBSCRIPTION_KEY;

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

    // Function to fetch wishlist items
    const fetchWishlistItems = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail");
        const getWishlist = `${process.env.GET_WISHLIST_API_URL}?Email=${userEmail}`;
        const apiKey = process.env.SUBSCRIPTION_KEY;

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

  // Function to generate a random background color
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

  // Function to toggle an item in the cart
  const toggleCart = async (item) => {
    const userEmail = sessionStorage.getItem("userEmail");
    const addToCartApi = process.env.CREATE_CART_API_URL;
    const removeFromCartApi = `${process.env.REMOVE_FROM_CART_API_URL}?ID=${item.ID}&Email=${userEmail}`;
    const apiKey = process.env.SUBSCRIPTION_KEY;

    try {
      if (!isItemInCart(item)) {
        // Add to Cart
        const response = await fetch(addToCartApi, {
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
            Email: userEmail,
          }),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      } else {
        // Remove from Cart
        const response = await fetch(removeFromCartApi, {
          method: "DELETE",
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      }

      // Toggle the item in the cart
      setCartItems((prevItems) =>
        isItemInCart(item)
          ? prevItems.filter((cartItem) => cartItem.ID !== item.ID)
          : [...prevItems, item]
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Function to check if an item is in the cart
  const isItemInCart = (item) =>
    cartItems.some((cartItem) => cartItem.ID === item.ID);

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (item) => {
    const deleteWishlistItemUrl = process.env.REMOVE_FROM_WISHLIST_API_URL;
    const apiKey = process.env.SUBSCRIPTION_KEY;

    try {
      const userEmail = sessionStorage.getItem("userEmail");
      const response = await fetch(
        `${deleteWishlistItemUrl}?ID=${item.ID}&Email=${userEmail}`,
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

      // After successful deletion, update the wishlistItems state
      setWishlistItems((prevItems) =>
        prevItems.filter((wishlistItem) => wishlistItem.ID !== item.ID)
      );
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  return (
    <div className="animated-text">
      <div className="wishlist-container">
        <Typography variant="h2" className="wishlist-heading">
          Wishlist 💖
        </Typography>

        {/* Cart icon with total item count */}
        <Link to="/cart" className="cart-link">
          <div className="cart-icon">
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </div>
        </Link>

        {wishlistItems.length === 0 ? (
          <Typography variant="h6">
            Your wishlist currently has no items selected.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid item key={item.ID} xs={12} sm={6} md={4}>
                <Card
                  className="wishlist-item-card"
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

                    {/* "Add To Cart" or "Remove From Cart" button */}
                    <Button
                      variant="contained"
                      color={isItemInCart(item) ? "secondary" : "primary"}
                      onClick={() => toggleCart(item)}
                      style={{ marginTop: "20px", marginRight: "150px" }}
                    >
                      {isItemInCart(item) ? "Remove From Cart 🛒" : "Add To Cart 🛒"}
                    </Button>
                    {/* "Remove From Wishlist" button */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => removeFromWishlist(item)}
                      style={{ marginTop: "20px" }}
                    >
                      Remove From Wishlist 💖
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
