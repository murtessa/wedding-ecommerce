import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./Components/Header";
import Register from "./pages/Register";
import CustomerSignup from "./pages/CustomerSignup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VendorVerification from "./pages/VendorVerification";

function App() {
  return (
    <Router>
      <Header /> {/* ✅ Now Header is present on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/vendor" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/customer" element={<CustomerSignup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-vendor" element={<VendorVerification />} />
        {/* <Route path="/register/vendor" element={<VendorRegister />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
