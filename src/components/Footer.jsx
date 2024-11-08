import React from "react";
import swiggy from "../assets/logo_2022.avif"; // footer logo

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container mx-auto px-8 py-12 flex justify-center">
        <div className="flex flex-col items-center">
          {/* logo */}
          <img
            src={swiggy}
            alt="Swiggy Logo"
            className="h-10 w-auto mb-2 max-w-xs" 
          />

          {/* copyright text */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Foodie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
