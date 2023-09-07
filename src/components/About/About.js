// Import necessary dependencies and styles
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import logo from "../../images/logo.png";
import "./About.css";

// Create a styled container for the About section
const AboutContainer = styled("div")({
  padding: "16px",
});

// Create a styled image for the logo
const LogoImage = styled("img")({
  maxWidth: "25%",
  display: "block",
  margin: "0 auto",
  marginBottom: "20px",
  marginTop: "0px",
});

// Define the About functional component
const About = () => {
  return (
    <div className="animated-text">
      {/* Container for the About section */}
      <div className="about-container gradient-background">
        <AboutContainer>
          {/* Logo Image */}
          <LogoImage src={logo} alt="Logo" />
          {/* Main Title */}
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontSize: "50px", color: "blue" }}
          >
            About Us 📖
          </Typography>
        </AboutContainer>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={11.8}>
            {/* About Title */}
            <Typography
              variant="h4"
              gutterBottom
              style={{
                fontSize: "40px",
                color: "darkblue",
                textAlign: "right",
              }}
            >
              Welcome to the : GYANODAYA
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* About Us Description */}
            <Typography paragraph>
              Our unwavering commitment is to deliver exceptional educational
              materials through our cutting-edge e-commerce platform. Our noble
              mission is to democratize learning, ensuring it is within reach
              for all, by offering an extensive array of top-tier educational
              resources and products. We steadfastly believe that education is
              the cornerstone of personal and societal growth, and our dedicated
              efforts are channeled towards making it accessible, affordable,
              and of the highest quality to learners of all backgrounds and
              aspirations. Through innovation, integrity, and a deep-rooted
              passion for education, we aim to empower individuals to unlock
              their full potential and enrich their lives through the
              transformative power of knowledge.
            </Typography>
            {/* Vision Title */}
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontSize: "30px", color: "blue" }}
            >
              Our Vision
            </Typography>

            {/* Vision Description */}
            <Typography paragraph>
              Our vision is to empower learners of all ages with the tools they
              need to succeed. Whether you're a student, teacher, or lifelong
              learner, we have something for you. We are committed to creating
              an inclusive, supportive educational environment where every
              learner is valued and inspired. Through curated resources and
              innovative technologies, we aim to ignite a lifelong passion for
              knowledge and be a trusted companion on the path to success.
            </Typography>
            {/* Why Choose Us Title */}
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontSize: "30px", color: "blue" }}
            >
              Why Choose Us?
            </Typography>
            {/* Why Choose Us Description */}
            <Typography paragraph>
              Our e-commerce web app is meticulously crafted with your
              educational aspirations at its core. We prioritize delivering a
              user-friendly interface, a diverse array of products, and
              unwavering commitment to exceptional customer support. We invite
              you to embark on your journey of knowledge and skill expansion
              with us.
            </Typography>
            {/* Inspiration Title */}
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontSize: "30px", color: "blue" }}
            >
              Inspiration
            </Typography>
            {/* Inspiration Description */}
            <Typography paragraph>
              Begin Your Journey of Learning and Growth with Us! At GYANODAYA ,
              we're dedicated to your educational success. Our user-friendly
              e-commerce platform offers a wide selection of top-quality
              products, backed by exceptional customer support. Whether you're a
              student, teacher, or lifelong learner, we have the resources you
              need to expand your knowledge and skills. Join us on this
              inspiring journey of education and personal growth today!
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

// Export the About component for use in other parts of the application
export default About;
