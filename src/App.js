import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Help from "./components/Help/Help";
import Login from "./components/Login/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import AllProducts from "./components/AllProducts/AllProducts";
import Cart from "./components/Cart/Cart";
import BuyNow from "./components/BuyNow/BuyNow";
import Wishlist from "./components/Wishlist/Wishlist";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import AccountDetails from "./components/AccountDetails/AccountDetails";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buynow" element={<BuyNow />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account-details" element={<AccountDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
