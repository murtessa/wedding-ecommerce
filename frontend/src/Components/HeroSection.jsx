import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[85vh] flex items-center text-white px-6 md:px-16"
      style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
    >
      <div className="w-full md:w-2/5 flex items-center">
        <div className=" p-10 rounded-lg w-full">
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
      </div>
    </section>
  );
};

export default HeroSection;
