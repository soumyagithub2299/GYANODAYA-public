import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Box,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";

import "./AllProducts.css";

const AllProducts = () => {
  // State to manage all products and filtered products
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for displaying no products message
  const [noProductsMessage, setNoProductsMessage] = useState("");
  
  // State for controlling the price range filter
  const [priceRangeFilterOpen, setPriceRangeFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  
  // State to manage cart and wishlist items
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Function to get the count of wishlist items
  const getWishlistItemCount = () => {
    return wishlistItems.length;
  };

  // Function to get the count of cart items
  const getCartItemCount = () => {
    return cartItems.length;
  };

  // Initialize the navigation
  const navigate = useNavigate();

  // State for managing Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to filter products by price range
  const filterProductsByPriceRange = () => {
    const filteredProducts = allProducts.filter((product) => {
      const productPrice = parseInt(product.Price.replace("₹", ""));
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
    setProducts(filteredProducts);

    // Show a message when no products match the filter
    if (filteredProducts.length === 0) {
      setNoProductsMessage(
        "No products within your budget currently available."
      );
    } else {
      setNoProductsMessage("");
    }
  };

  // Function to fetch all products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.GET_ALL_PRODUCTS_API_URL}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.data) {
        const productsWithStatus = data.data.map((product) => ({
          ...product,
          isInCart: false,
          isInWishlist: false,
        }));
        setAllProducts(productsWithStatus);
        setProducts(productsWithStatus);
      } else {
        console.error("API response does not contain expected data:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle search
  const handleSearch = () => {
    const filteredProducts = allProducts.filter((product) =>
      product.Subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      setNoProductsMessage("No products found for the given search criteria.");
    } else {
      setNoProductsMessage("");
    }

    setProducts(filteredProducts);
  };

  // Function to add an item to the cart
  const addToCart = async (product) => {
    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");

      if (!userEmail) {
        // Show the alert and return
        setSnackbarMessage("Please login to add items to the cart.");
        setSnackbarOpen(true);
        return;
      }
  
      if (!userEmail) {
        // Handle the case when userEmail is not available
        console.error("User email is not available.");
        // You can add logic here to redirect to a login page or display an error message.
        return;
      }
  
      const response = await fetch(
        `${process.env.CREATE_CART_API_URL}`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: product.ID,
            Name: product.Name,
            Subject: product.Subject,
            Price: product.Price,
            Email: userEmail, // Include userEmail in the request body
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      // Update the cartItems state
      setCartItems([...cartItems, product]);
      // Update isInCart flag for the added product
      setAllProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.ID === product.ID
            ? { ...prevProduct, isInCart: true }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (product) => {
    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");
  
      if (!userEmail) {
        // Handle the case when userEmail is not available
        console.error("User email is not available.");
        // You can add logic here to redirect to a login page or display an error message.
        return;
      }
  
      const response = await fetch(
        `${process.env.REMOVE_FROM_CART_API_URL}?ID=${product.ID}&Email=${userEmail}`,
        {
          method: "DELETE",
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      // Update the cartItems state by removing the deleted item
      setCartItems(cartItems.filter((item) => item.ID !== product.ID));
      // Update isInCart flag for the removed product
      setAllProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.ID === product.ID
            ? { ...prevProduct, isInCart: false }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to add an item to the wishlist
  const addToWishlist = async (product) => {
    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");
  
      if (!userEmail) {
        // Show the alert and return
        setSnackbarMessage("Please login to add items to the wishlist.");
        setSnackbarOpen(true);
        return;
      }
  
      const response = await fetch(
        `${process.env.CREATE_WISHLIST_API_URL}`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: product.ID,
            Name: product.Name,
            Subject: product.Subject,
            Price: product.Price,
            Email: userEmail, // Include userEmail in the request body
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      // Update the wishlistItems state
      setWishlistItems([...wishlistItems, product]);
      // Update isInWishlist flag for the added product
      setAllProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.ID === product.ID
            ? { ...prevProduct, isInWishlist: true }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (product) => {
    try {
      // Retrieve the userEmail from session storage
      const userEmail = sessionStorage.getItem("userEmail");
  
      if (!userEmail) {
        // Handle the case when userEmail is not available
        console.error("User email is not available.");
        // You can add logic here to redirect to a login page or display an error message.
        return;
      }
  
      const response = await fetch(
        `${process.env.REMOVE_FROM_WISHLIST_API_URL}?ID=${product.ID}&Email=${userEmail}`,
        {
          method: "DELETE",
          headers: {
            "Ocp-Apim-Subscription-Key":  process.env.SUBSCRIPTION_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      // Update the wishlistItems state by removing the deleted item
      setWishlistItems(wishlistItems.filter((item) => item.ID !== product.ID));
      // Update isInWishlist flag for the removed product
      setAllProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.ID === product.ID
            ? { ...prevProduct, isInWishlist: false }
            : prevProduct
        )
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  // Function to get a random background color
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

  // Function to fetch cart items
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
  
      const response = await fetch(
        `${process.env.GET_CART_API_URL}?Email=${userEmail}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key":  process.env.SUBSCRIPTION_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      if (data && data.data) {
        setCartItems(data.data);
      } else {
        console.error("API response does not contain expected data:", data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to check if a product is in the cart
  const isInCart = (product) => {
    return cartItems.some((cartItem) => cartItem.ID === product.ID);
  };

  // Function to fetch wishlist items
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
  
      const response = await fetch(
        `${process.env.GET_WISHLIST_API_URL}?Email=${userEmail}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      if (data && data.data) {
        setWishlistItems(data.data);
      } else {
        console.error("API response does not contain expected data:", data);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  // Fetch wishlist items when the component mounts
  useEffect(() => {
    fetchWishlistItems();
  }, []);

  // Function to check if a product is in the wishlist
  const isInWishlist = (product) => {
    return wishlistItems.some((wishlistItem) => wishlistItem.ID === product.ID);
  };

  return (
    <div className="animated-text">
      <div className="all-products-container">
        {/* Page Title */}
        <Typography
          variant="h2"
          style={{
            color: "blue",
            marginTop: "20px",
            marginBottom: "17px",
            animation: "fadeIn 0.5s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "2.5rem",
          }}
        >
          All Products
        </Typography>

        {/* Filter Button */}
        <Box
          className="filter-box"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <IconButton color="primary" onClick={() => navigate("/wishlist")}>
            <Badge badgeContent={getWishlistItemCount()} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <Button
            variant="outlined"
            className="filter-button"
            onClick={() => setPriceRangeFilterOpen(!priceRangeFilterOpen)}
            style={{
              height: "45px",
              width: "150px",
              fontSize: "17px",
              fontWeight: "bold",
              borderWidth: "2px",
              backgroundColor: "lightyellow",
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            Filter
          </Button>

          <IconButton color="primary" onClick={() => navigate("/wishlist")}>
            <Badge badgeContent={getCartItemCount()} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* Price Range Filter */}
        {priceRangeFilterOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            <TextField
              label="Minimum Price"
              type="number"
              variant="outlined"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ marginBottom: "12px" }}
            />
            <TextField
              label="Maximum Price"
              type="number"
              variant="outlined"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={filterProductsByPriceRange}
            >
              Apply Filter
            </Button>
          </div>
        )}

        {/* Centered Search Input */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "500px",
          }}
        >
          <TextField
            placeholder="Search product by Subject name"
            variant="outlined"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} color="primary">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Grid for Products */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.ID} xs={12} sm={6} md={4}>
              <div style={{ margin: "0 20px" }}>
                <Card
                  className="product-card-animation"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    backgroundColor: getRandomColor(),
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontWeight: "bold", fontSize: "20px" }}
                    >
                      Price : {product.Price}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "#000080" }}
                    >
                      Subject : {product.Subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description : {product.Description}
                    </Typography>

                    {/* Add/Remove from Cart Buttons */}
                    {isInCart(product) ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        className="cart-button"
                        onClick={() => removeFromCart(product)}
                        style={{ marginTop: "20px", marginRight: "150px" }}
                      >
                        Remove From Cart 🛒
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className="cart-button"
                        onClick={() => addToCart(product)}
                        style={{ marginTop: "20px", marginRight: "150px" }}
                      >
                        Add To Cart 🛒
                      </Button>
                    )}

                    {/* Add/Remove from Wishlist Buttons */}
                    {isInWishlist(product) ? (
                      <Button
                        variant="contained"
                        className="wishlist-button"
                        color="secondary"
                        onClick={() => removeFromWishlist(product)}
                        style={{ marginTop: "20px" }}
                      >
                        Remove From Wishlist 💖
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="wishlist-button"
                        color="primary"
                        onClick={() => addToWishlist(product)}
                        style={{ marginTop: "20px" }}
                      >
                        Add To Wishlist 💖
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>

        {/* No Products Message */}
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          {noProductsMessage}
        </Typography>

        {/* Snackbar for Messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="warning"
            onClose={handleSnackbarClose}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default AllProducts;
