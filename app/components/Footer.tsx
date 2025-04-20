'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              MarketHub
            </h3>
            <p className="text-gray-400">
              Your one-stop multi-vendor marketplace for all your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary-400 transition">Home</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-primary-400 transition">Categories</Link></li>
              <li><Link href="/search" className="text-gray-400 hover:text-primary-400 transition">Search</Link></li>
              <li><Link href="/account" className="text-gray-400 hover:text-primary-400 transition">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-primary-400 transition">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-primary-400 transition">FAQs</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-primary-400 transition">Returns Policy</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition"><i className="fab fa-linkedin-in"></i></a>
            </div>

            <p className="text-gray-400">Subscribe to our newsletter</p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-dark-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MarketHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
