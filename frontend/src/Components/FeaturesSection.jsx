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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          We provide everything you need for a perfect wedding experience.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2"
            >
              <div className="text-primary text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
