// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-blue-600 text-white py-16 pl-4 pr-12 md:px-20">
      <div className="max-w-7xl font-[light-font] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Services Section */}
        <div>
          <h3 className="text-2xl text-blue-600 font-semibold mb-3">Xenolve Tech</h3>
          <ul>
            <li><a href="#" className="hover:text-gray-400">Web Development</a></li>
            <li><a href="#" className="hover:text-gray-400">Custom Software Solutions</a></li>
            <li><a href="#" className="hover:text-gray-400">AI Automation</a></li>
            <li><a href="#" className="hover:text-gray-400">Chatbots</a></li>
          </ul>
        </div>
        {/*Xenolve Media */}
        <div>
          <h3 className="text-2xl text-blue-600 font-semibold mb-3">Xenolve Media</h3>
          <ul>
            <li><a href="#" className="hover:text-gray-400">Social Media Marketing</a></li>
            <li><a href="#" className="hover:text-gray-400">Organic Marketing</a></li>
            <li><a href="#" className="hover:text-gray-400">Content Marketing</a></li>
          </ul>
        </div>
        {/*Xenolve Cohorts */}
        <div>
          <h3 className="text-2xl text-blue-600 font-semibold mb-3">Xenolve Cohorts</h3>
          <ul>
            <li><a href="#" className="hover:text-gray-400">Web Development Cohorts</a></li>
            <li><a href="#" className="hover:text-gray-400">AI Cohorts</a></li>
            <li><a href="#" className="hover:text-gray-400">College Projects</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-2xl text-blue-600 font-semibold mb-3">Contact</h3>
          <ul>
            <li><a href="mailto:support@xenolve.com" className="hover:text-gray-400">Email Us</a></li>
            <li><a href="tel:+1234567890" className="hover:text-gray-400">Call Us</a></li>
            <li><a href="#" className="hover:text-gray-400">Location</a></li>
          </ul>
        </div>

        {/* Other Details Section */}
        <div>
          <h3 className="text-2xl text-blue-600 font-semibold mb-3">Other Information</h3>
          <ul>
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} XENOLVE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
