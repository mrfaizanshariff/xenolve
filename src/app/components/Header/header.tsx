'use client'
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">Xenolve</div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-[0.6] justify-around space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
            <li>
              <a href="#" className="hover:text-blue-600" onClick={toggleMobileMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600" onClick={toggleMobileMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600" onClick={toggleMobileMenu}>
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600" onClick={toggleMobileMenu}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
