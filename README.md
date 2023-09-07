
GYANODAYA - Education E-commerce Single Page Web App
Welcome to the GYANODAYA React web app repository! GYANODAYA is an educational e-commerce single-page web application built using React, with Material-UI (MUI) for the frontend. It utilizes Azure services such as Azure Function App, Azure Blob Storage, Azure API Management. This project also includes unit testing and integration testing using Jest, error monitoring with Sentry, and detailed API documentation created with Postman.

GitHub Repository: https://github.com/soumyagithub2299/frontend-of-GYANODAYA

Table of Contents:

Project Overview ,
Features ,
Technologies Used ,
Project Management ,
Getting Started ,
Setting Up the Backend ,
Setting Up the Frontend ,
Testing ,
API Management ,
Error Monitoring ,
License ,



Project Overview :
GYANODAYA is an educational e-commerce platform that allows users to browse, search, and purchase educational materials such as books, ePDFs. The project leverages various Azure services for backend functionality, provides a user-friendly frontend using React and Material-UI, and implements dynamic folder structures to securely store user data. The application also features authentication and encryption for secure login and logout functionality.

Features :
User Registration and Authentication:

Users can register and authenticate using secure login/logout sessions.
Authentication and encryption mechanisms ensure user data is safe and secure.
Product Management:

Admins can manage products and categories.
Secure product management ensures data integrity.
Dynamic Backend:

Utilizes dynamic folder structures to efficiently store and organize user data.
User Sessions:

Implements login/logout functionality with session management.
Educational Materials:

Users can browse, search, and purchase educational materials such as books and ePDFs.
Cart and Wishlist:

Users can add products to their cart and wishlist.
Checkout and Payment Processing:

Secure checkout and payment processing for a seamless shopping experience.
Azure Services:

Utilizes Azure services like Azure Function App, Azure Blob Storage, and Azure API Management for robust backend operations.
Unit and Integration Testing:

Jest is used for automated testing to ensure code quality.
Error Monitoring:

Sentry is employed for real-time error monitoring and reporting.
API Documentation:

Postman is used for API testing and documentation.



Technologies Used:
Frontend:

React: A JavaScript library for building user interfaces.
Material-UI (MUI): A popular UI framework for React applications.
React Router DOM for routing and managing URLs.
Backend:

Azure Function App: Serverless compute service for running backend functions.
Azure Blob Storage: Scalable, secure object storage service.
Node.js and JavaScript for server-side logic.

Testing:
Postman: A tool for API testing and documentation.

Project Management:
Project management for GYANODAYA is handled through JIRA, where tasks and project progress are tracked. The project owner, Soumya Tiwari, is responsible for managing the project and its tasks.




Getting Started
To run the GYANODAYA web app locally, follow these instructions:

Setting Up the Backend
Clone the backend repository:

bash
Copy code
github link -  https://github.com/soumyagithub2299/    

.........******......... you can not clone my backend due to privacy policy for my Azure Account

Set up your Azure Function App environment and configure your Azure Blob Storage account.

Install the required Node.js packages:

bash
Copy code
cd backend-of-GYANODAYA
npm install
Start the backend server:

bash
Copy code
npm start
Setting Up the Frontend
Clone the frontend repository:

bash
Copy code
github link -  https://github.com/soumyagithub2299/ 

.........******......... you can not clone my frontend due to my privacy policy.

Navigate to the project directory:

bash
Copy code
cd frontend-of-GYANODAYA
Install the required Node.js packages:

bash
Copy code
npm install

mathematica
Copy code
REACT_APP_API_BASE_URL=<YOU CAN'T ACCESS THIS>
Start the development server:

bash
Copy code
npm start
Your GYANODAYA frontend should now be running locally.




Postman was used for API testing and documentation. Import the Postman collection provided in the repository and configure the environment variables accordingly.

API Management
GYANODAYA integrates Azure API Management for managing, securing, and monitoring APIs. Key API management tasks include:

API Policies: Define policies in Azure API Management to secure, rate limit, and customize the behavior of your APIs.

Authentication and Authorization: Secure your APIs by applying authentication and authorization policies. Azure API Management supports various authentication methods like API keys, OAuth, and more.

Publishing APIs: Publish your imported and configured APIs to make them accessible externally. Choose the desired API products and deployment options.

Subscription and Access Control: Users and applications need to subscribe to your APIs through Azure API Management. They will receive API keys or access tokens for authentication.

Monitoring and Analytics: Azure API Management provides detailed analytics and monitoring tools to track API usage, performance, and errors. Utilize these insights to optimize your APIs.

Documentation: Automatically generated documentation is available in Azure API Management, making it easier for developers to understand and use your APIs.

For detailed instructions on Azure API Management, refer to the Azure API Management documentation.

Error Monitoring
GYANODAYA uses Sentry for error monitoring and reporting. Sentry helps track and diagnose errors in real-time, ensuring the application runs smoothly.

License
This project is licensed under the MIT License - see the LICENSE file for details.# GYANODAYA-public
