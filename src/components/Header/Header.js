import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "../../images/logo.png";
import userImage from "../../images/user-image.png";

import './Header.css'

const Header = () => {
  // State to control the drawer (mobile menu) open/close
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Styles for the logo
  const logoStyles = {
    cursor: "pointer",
    height: "50px",
    marginRight: "15px",
  };

  // Style for the active button in the navigation menu
  const activeButtonStyle = {
    borderBottom: "2px solid yellow",
  };

  // Style for buttons in the navigation menu
  const buttonStyles = {
    marginLeft: "5px",
    fontSize: "18px",
  };

  // Get the current location
  const location = useLocation();

  // Check if the user is logged in by retrieving their session data directly
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  // Toggle the mobile menu (drawer) open and close
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  // Content of the mobile menu (drawer)
  const drawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>🏠</ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/all-products">
          <ListItemIcon>📦</ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemIcon>🛒</ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button component={Link} to="/wishlist">
          <ListItemIcon>💖</ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>ℹ️</ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>📞</ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component={Link} to="/help">
          <ListItemIcon>❓</ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {isLoggedIn ? (
          <ListItem button component={Link} to="/account-details">
            <ListItemIcon>
              <img
                src={userImage}
                alt="User Profile"
                style={{ height: "30px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <img
                src={userImage}
                alt="User Profile"
                style={{ height: "30px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Mobile menu (drawer) toggle button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          className="toggle-button" 
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Link to="/about">
          <img src={logo} alt="logo" style={logoStyles} />
        </Link>

        {/* Account/Login button */}
        {isLoggedIn ? (
          <Button
            color="inherit"
            component={Link}
            to="/account-details"
            style={
              location.pathname === "/account-details"
                ? { ...buttonStyles, ...activeButtonStyle }
                : buttonStyles
            }
          >
            <img
              src={userImage}
              alt="User Profile"
              style={{ height: "40px" }}
            />
            ACCOUNT
          </Button>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            style={
              location.pathname === "/login"
                ? { ...buttonStyles, ...activeButtonStyle }
                : buttonStyles
            }
          >
            <img
              src={userImage}
              alt="User Profile"
              style={{ height: "40px" }}
            />
            LOGIN
          </Button>
        )}

        {/* Mobile menu (drawer) */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
