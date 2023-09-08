import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Footer.css";

const Footer = () => {
  // Replace these with your actual links
  const linkedinLink = "https://www.linkedin.com/in/soumyatiwari7247/";
  const githubLink = "https://github.com/soumyagithub2299";
  const email = "soumyatiwari7247@gmail.com";
  const phoneNumber = "+91 7247092299";

  return (
    // The Footer component consists of an AppBar, which is a Material-UI component.
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left-aligned Typography displaying copyright information */}
        <Typography variant="body1" color="inherit" className="footer-text">
          {new Date().getFullYear()} ©️ GYANODAYA
        </Typography>

        {/* Right-aligned section for social icons and contact information */}
        <div style={{ marginLeft: "auto" }}>
          {/* LinkedIn Icon Button */}
          <IconButton
            color="inherit"
            aria-label="LinkedIn"
            component="a"
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "2rem", // Increase icon size
              transition: "transform 0.3s", // Add transition
              marginRight: "20px", // Increase space between LinkedIn and GitHub icons
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            } // Scale up on hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Reset on hover out
          >
            <LinkedInIcon />
          </IconButton>

          {/* GitHub Icon Button */}
          <IconButton
            color="inherit"
            aria-label="GitHub"
            component="a"
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "2rem",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <GitHubIcon />
          </IconButton>
        </div>

        {/* Contact information with a margin top for spacing */}
        <Typography
          className="footer-text"
          variant="body2"
          color="inherit"
          style={{ marginTop: "10px" }}
        >
          {email} | {phoneNumber}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
