import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./Components/Header";
import Register from "./pages/Register";
import CustomerSignup from "./pages/CustomerSignup";

function App() {
  return (
    <Router>
      <Header /> {/* ✅ Now Header is present on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/customer" element={<CustomerSignup />} />
        {/* <Route path="/register/vendor" element={<VendorRegister />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
