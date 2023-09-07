import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import ownerImage from '../../images/owner.jpg';

import './Contact.css';

// Styled component for the ContactContainer div
const ContactContainer = styled('div')({
  padding: '16px',
});

// Styled component for the owner's image
const OwnerImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '10px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.04)',
  },
});

// Function to open the GitHub profile in a new tab
const openGitHubLink = () => {
  window.open('https://github.com/soumyagithub2299', '_blank');
};

// Function to open the personal website in a new tab
const openWebsiteLink = () => {
  window.open('https://soumyagithub2299.github.io/portfolio/', '_blank');
};

// Function to open the LinkedIn profile in a new tab
const openLinkedInLink = () => {
  window.open('https://www.linkedin.com/in/soumyatiwari7247/', '_blank');
};

const Contact = () => {
  return (
    <div className="animated-text">
      <div className="contact-container">
        <ContactContainer>
          <Typography variant="h4" gutterBottom style={{ color: 'blue', textAlign: 'center' }}>
            Contact Us
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <OwnerImage src={ownerImage} alt="Owner" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom style={{ color: 'darkblue', fontSize: '50px', textAlign: 'center', marginTop: '50px' }}>
                Owner : Soumya Tiwari
              </Typography>

              <Typography variant="body1" gutterBottom style={{ color: 'green', fontSize: '25px', textAlign: 'center' }}>
                Phone Number : +91 7247092299
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: 'green', fontSize: '25px', textAlign: 'center' }}>
                Email : soumyatiwari7247@gmail.com
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: 'green', fontSize: '25px', textAlign: 'center' }}>
                Location : Indore, Madhya Pradesh, India (452001)
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '28px', textAlign: 'center' }}>
                GitHub : <button onClick={openGitHubLink}>github.com/soumyagithub2299</button>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '28px', textAlign: 'center' }}>
                Website : <button onClick={openWebsiteLink}>www.soumyatiwari.com</button>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '28px', textAlign: 'center' }}>
                LinkedIn : <button onClick={openLinkedInLink}>linkedin.com/in/soumyatiwari7247/</button>
              </Typography>

            </Grid>
            <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>
              If you have any questions, feedback, or just want to say hello, please feel free to reach out to the Gyanodaya team or our owner, Soumya Tiwari. You can contact us via email at <a href="mailto:soumyatiwari7247@gmail.com" style={{ textDecoration: 'none', color: 'blue' }}>soumyatiwari7247@gmail.com</a> or give us a call at <a href="tel:+917247092299" style={{ textDecoration: 'none', color: 'blue' }}>+91 7247092299</a>. We'd love to hear from you!
            </Typography>
          </Grid>
        </ContactContainer>
      </div>
    </div>
  );
};

export default Contact;
