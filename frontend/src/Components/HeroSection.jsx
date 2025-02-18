import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold">
          Your Dream Wedding Starts Here
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover premium wedding services, venues, and decorations tailored
          for your big day.
        </p>
        <a
          href="/shop"
          className="mt-6 inline-block bg-primary px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
        >
          Explore Packages
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
