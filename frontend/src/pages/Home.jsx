import React from "react";
import HeroSection from "../Components/HeroSection";
import FeaturesSection from "../Components/FeaturesSection";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
