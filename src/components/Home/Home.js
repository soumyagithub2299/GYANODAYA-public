import React from "react";
import { Link } from "react-router-dom";
import ServiceCart from "../ServiceCart/ServiceCart";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import logo from "../../images/logo.png";
import "./Home.css";

const Home = () => {
  // Links to GitHub repository and portfolio
  const githubLink = "https://github.com/soumyagithub2299/GYANODAYA-public";

  const githubLinkBackend =
    "https://github.com/soumyagithub2299/GYANODAYA-backend";

  const portfolioLink = "https://soumyagithub2299.github.io/portfolio/";

  // Array of services provided
  const services = [
    {
      technology: "Microsoft AZURE ",
      description:
        "I chose Azure for our project because it offers a versatile suite of cloud services, seamless integration with our existing tools, robust security measures, and a global network of data centers, ensuring scalability, efficiency, and data protection.",
    },
    {
      technology: "Azure Blob Storage",
      description:
        "With Node.js I selected Azure Blob Storage because it provides secure, scalable, and cost-effective storage for our project's diverse data needs. Its native integration with Azure services streamlines our workflow, and its global availability ensures data access and redundancy across regions, enhancing reliability and performance.",
    },
    {
      technology: "Azure function App",
      description:
        "I chose Azure Function App for its serverless architecture, which streamlines code execution without infrastructure management, and its seamless integration with Azure services, enabling efficient, scalable backend logic for our project.",
    },
    {
      technology: "Azure API Management",
      description:
        "Opted for Azure API Management to centralize API control, secure endpoints, and simplify their management, enhancing developer and consumer experiences while maintaining security and performance standards.",
    },
    {
      technology: "React.js",
      description:
        "React.js was chosen for this project because of its component-based architecture, which simplifies UI development, enhances code reusability, and promotes efficient updates. Its virtual DOM ensures fast rendering, resulting in a responsive user interface. Additionally, React's strong community support and ecosystem of libraries make it a robust choice for building dynamic and interactive web applications.",
    },
    {
      technology: "Material-UI",
      description:
        "I opted Material-UI for my project because it provides a well-designed, consistent, and responsive set of UI components based on Google's Material Design principles. This choice allows us to create a visually appealing and user-friendly interface quickly while maintaining a unified design language throughout our application.",
    },
    {
      technology: "Postman",
      description:
        "Used Postman for its simplicity and effectiveness in testing and documenting the APIs, making the development process more efficient and reliable.",
    },
    {
      technology: "GitHub & VS Code",
      description:
        "I utilized GitHub and VS Code for collaborative coding, version control, and efficient development, streamlining our project workflow.",
    },
    {
      technology: "Jira",
      description:
        "I employed myself in Jira for this GYANODAYA project management and issue tracking, enhancing organization and collaboration throughout the project lifecycle.",
    },
  ];

  return (
    <div className="animated-text">
      <div className="home-gradient-background">
        <Container maxWidth="md">
          <Card
            style={{ marginTop: "22px", position: "relative", cursor: "auto" }}
          >
            <CardContent>
              <Typography
                variant="h4"
                style={{ color: "#000080", cursor: "auto" }}
              >
                What You Will Get Here ?
              </Typography>

              <Typography
                variant="h6"
                className="typing-text"
                style={{ color: "blue", cursor: "auto" }}
              >
                Comprehensive e-books ( PDF ) for all subjects.
              </Typography>

              <Typography variant="body2" style={{ color: "green" }}>
                Welcome to our education platform. We offer a wide range of
                e-books to help you excel in your studies.
              </Typography>

              <img src={logo} alt="logo" className="logo-inside-bottom-card" />
            </CardContent>
          </Card>

          <br></br>
          <Typography
            variant="body2"
            style={{
              color: "#000080",
              marginTop: "20px",
              marginBottom: "20px",
              fontStyle: "italic",
              textAlign: "center",
              fontSize: "1.2rem",
              cursor: "auto",
            }}
          >
            ... Explore our extensive range of products and discover a world of
            possibilities. To see the full spectrum of offerings, kindly visit
            our{" "}
            <Link to="/all-products" style={{ textDecoration: "underline" }}>
              Products
            </Link>{" "}
            page ...
          </Typography>

          {/* Services */}
          <Box
            textAlign="center"
            mt={3}
            style={{ marginBottom: "25px", marginTop: "50px" }}
          >
            <Typography
              variant="h4"
              className="animated-text"
              style={{ fontSize: "2.5rem", color: "#000080" }}
            >
              How did I made this project ... 🧑‍💻
            </Typography>
          </Box>

          {services.map((service, index) => (
            <ServiceCart
              key={index}
              technology={service.technology}
              description={service.description}
            />
          ))}
        </Container>

        <Card
          style={{
            marginTop: "22px",
            position: "relative",
            backgroundColor: "lightyellow",
            cursor: "auto",
          }}
        >
          <CardContent>
            <Typography variant="h4" style={{ color: "#000080" }}>
              <Button
                component={Link}
                to={portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s",
                }}
                className="button-hover"
              >
                👉 Click here to go to my portfolio website 🧑‍💻
              </Button>
            </Typography>

            <Typography variant="h4" style={{ color: "#000080" }}>
              <Button
                component={Link}
                to={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s",
                }}
                className="button-hover"
              >
                👉 Click here to go to GitHub repository of this project 🔗
              </Button>
            </Typography>

            <Typography variant="h4" style={{ color: "#000080" }}>
              <Button
                component={Link}
                to={githubLinkBackend}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s",
                }}
                className="button-hover"
              >
                👉 Click here to go to GitHub repository for backend of this
                project 🔗
              </Button>
            </Typography>

            <Typography variant="h4" style={{ color: "#000080" }}>
              <Button>
                <a
                  href="/json/localGyanodaya.postman_collection.json"
                  download="localGyanodaya.postman_collection.json"
                  style={{
                    textDecoration: "none",
                    color: "#000080",
                    fontSize: "1.2rem",
                    transition: "transform 0.2s",
                  }}
                  className="button-hover"
                >
                  👉 Click here to download the JSON file of my postman
                  collection for this project 📄
                </a>
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
