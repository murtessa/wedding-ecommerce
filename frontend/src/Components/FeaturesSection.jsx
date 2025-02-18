import React from "react";
import { FaGem, FaUsers, FaShoppingCart, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaGem />,
    title: "Luxury & Elegance",
    description: "Find high-end wedding packages and exquisite designs.",
  },
  {
    icon: <FaUsers />,
    title: "Trusted Vendors",
    description:
      "Verified wedding planners, decorators, and service providers.",
  },
  {
    icon: <FaShoppingCart />,
    title: "Easy Booking",
    description:
      "Seamless booking and payment system for a stress-free experience.",
  },
  {
    icon: <FaHeart />,
    title: "Personalized Services",
    description: "Customizable packages to match your dream wedding vision.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2">
          We provide everything you need for a perfect wedding experience.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-primary text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
