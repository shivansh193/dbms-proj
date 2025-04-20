"use client";
import React from "react";
import VendorCard from "../components/VendorCard";

interface Vendor {
  id: number;
  name: string;
  bannerImage: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  deliveryTime: string;
  productCount: number;
  joinedDate: string;
}

const mockVendor: Vendor = {
  id: 1,
  name: "TechGadgets",
  bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  rating: 4.5,
  reviews: 342,
  location: "San Francisco, CA",
  category: "Electronics",
  deliveryTime: "2-3 days",
  productCount: 78,
  joinedDate: "2020"
};

interface VendorProfileProps {}

const VendorProfile: React.FC<VendorProfileProps> = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 flex flex-col md:flex-row gap-8">
        <img src={mockVendor.bannerImage} alt={mockVendor.name} className="w-full md:w-1/3 rounded-lg object-cover mb-4 md:mb-0" />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <img src={mockVendor.logo} alt={mockVendor.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl font-bold">{mockVendor.name}</h1>
              <div className="text-gray-600 text-sm">{mockVendor.location}</div>
            </div>
          </div>
          <div className="flex gap-6 mb-4">
            <span className="text-primary-600 font-semibold">{mockVendor.rating} ★</span>
            <span className="text-gray-600">{mockVendor.reviews} reviews</span>
            <span className="text-gray-600">Joined {mockVendor.joinedDate}</span>
          </div>
          <div className="text-gray-700 mb-2">Category: {mockVendor.category}</div>
          <div className="text-gray-700 mb-2">Delivery: {mockVendor.deliveryTime}</div>
          <div className="text-gray-700 mb-2">Products: {mockVendor.productCount}</div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Products by {mockVendor.name}</h2>
      {/* You can map through vendor products here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example product card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Product" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="font-semibold mb-2">Wireless Bluetooth Headphones</h3>
          <div className="text-primary-600 font-bold mb-2">$99.99</div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md w-full">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
