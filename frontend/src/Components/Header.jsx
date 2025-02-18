import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Ensure logo is inside assets

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Wedding Logo"
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-20 transition-all"
          />
          <span className="text-2xl lg:text-3xl font-bold text-gray-800 font-serif">
            WedShop
          </span>
        </Link>

        {/* Navigation Links with Underline on Hover */}
        <nav className="hidden md:flex space-x-8">
          {" "}
          {/* Increased spacing between links */}
          <Link
            to="/"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            About
          </Link>
          <Link
            to="/services"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Contact
          </Link>
          <Link
            to="/"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Shops
          </Link>
          <Link
            to="/"
            className="relative text-gray-700 hover:text-secondary transition duration-300
                      after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                      after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 
                      hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Services
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
