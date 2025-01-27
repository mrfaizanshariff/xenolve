import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className=" z-500 relative flex flex-col gap-8 space-y-3">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
      >
        <Facebook size={20} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
      >
        <Twitter size={20} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition duration-200"
      >
        <Instagram size={20} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-800 text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition duration-200"
      >
        <Linkedin size={20} />
      </a>
    </div>
  );
};

export default FloatingButtons;
