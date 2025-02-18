import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">WeddingEcommerce</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for all wedding needs.
          </p>
        </div>

        <div className="space-x-6">
          <a
            href="/home"
            className="hover:text-white"
            rel="noopener noreferrer"
          >
            Home
          </a>
          <a href="/about" className="hover:text-white">
            About
          </a>
          <a href="/shop" className="hover:text-white">
            Shop
          </a>
          <a href="/contact" className="hover:text-white">
            Contact
          </a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} WeddingEcommerce. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
