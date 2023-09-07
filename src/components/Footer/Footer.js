import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

const Footer = () => {
  // Replace these with your actual links
  const linkedinLink = 'https://www.linkedin.com/in/soumyatiwari7247/';
  const githubLink = 'https://github.com/soumyagithub2299';
  const email = 'soumyatiwari7247@gmail.com';
  const phoneNumber = '+91 7247092299';

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Copyright and Footer Text */}
        <Typography variant="body1" color="inherit">
          {new Date().getFullYear()} ©️ GYANODAYA
        </Typography>

        {/* Social Media Icons */}
        <div style={{ marginLeft: 'auto' }}>
          {/* LinkedIn Icon */}
          <IconButton
            color="inherit"
            aria-label="LinkedIn"
            component="a"
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '2rem', // Increase icon size
              transition: 'transform 0.3s', // Add transition
              marginRight: '20px', // Increase space between LinkedIn and GitHub icons
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset on hover out
          >
            <LinkedInIcon />
          </IconButton>

          {/* GitHub Icon */}
          <IconButton
            color="inherit"
            aria-label="GitHub"
            component="a"
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '2rem', // Increase icon size
              transition: 'transform 0.3s', // Add transition
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')} // Scale up on hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset on hover out
          >
            <GitHubIcon />
          </IconButton>

          {/* Contact Information */}
          <Typography className="footer-text" variant="body2" color="inherit">
            {email} | {phoneNumber}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
