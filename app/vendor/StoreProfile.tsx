"use client";
import React, { useState, ChangeEvent } from "react";

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface Policies {
  shipping: string;
  returns: string;
  payment: string;
}

interface DeliveryOptions {
  standard: boolean;
  express: boolean;
  localPickup: boolean;
  deliveryRadius: number;
}

interface StoreInfo {
  name: string;
  description: string;
  logo: string;
  banner: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialMedia;
  policies: Policies;
  deliveryOptions: DeliveryOptions;
}

const initialStoreInfo: StoreInfo = {
  name: "TechGadgets",
  description:
    "Your one-stop shop for all the latest tech gadgets and accessories. We offer high-quality products with fast shipping and excellent customer service.",
  logo:
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  banner:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  email: "support@techgadgets.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, San Francisco, CA 94107",
  socialMedia: {
    facebook: "techgadgets",
    instagram: "techgadgets",
    twitter: "techgadgets",
  },
  policies: {
    shipping: "Free shipping on orders over $50. Standard delivery takes 2-3 business days.",
    returns: "30-day return policy. Items must be unused and in original packaging.",
    payment: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  deliveryOptions: {
    standard: true,
    express: true,
    localPickup: false,
    deliveryRadius: 50,
  },
};

const StoreProfile: React.FC = () => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'policies' | 'delivery' | 'social'>('general');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value },
    }));
  };

  const handlePolicyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      policies: { ...prev.policies, [name]: value },
    }));
  };

  const handleDeliveryOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      deliveryOptions: { ...prev.deliveryOptions, [name]: checked },
    }));
  };

  const handleDeliveryRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      deliveryOptions: { ...prev.deliveryOptions, deliveryRadius: parseInt(value) || 0 },
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, save to backend
    // console.log('Saved store info:', storeInfo);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Profile</h1>
        {editMode ? (
          <div className="space-x-2">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="mb-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'general' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'policies' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('policies')}
        >
          Policies
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'delivery' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('delivery')}
        >
          Delivery
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'social' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('social')}
        >
          Social
        </button>
      </div>
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'general' && (
          <div>
            <div className="mb-4 flex flex-col md:flex-row gap-6 items-center">
              <img src={storeInfo.logo} alt="Logo" className="w-24 h-24 rounded-full object-cover" />
              <img src={storeInfo.banner} alt="Banner" className="w-full md:w-2/3 rounded-lg object-cover" />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Store Name</label>
              <input
                type="text"
                name="name"
                value={storeInfo.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={storeInfo.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={storeInfo.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={storeInfo.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={storeInfo.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
        {activeTab === 'policies' && (
          <div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Shipping Policy</label>
              <textarea
                name="shipping"
                value={storeInfo.policies.shipping}
                onChange={handlePolicyChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Return Policy</label>
              <textarea
                name="returns"
                value={storeInfo.policies.returns}
                onChange={handlePolicyChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Payment Policy</label>
              <textarea
                name="payment"
                value={storeInfo.policies.payment}
                onChange={handlePolicyChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
        {activeTab === 'delivery' && (
          <div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Delivery Options</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="checkbox"
                    name="standard"
                    checked={storeInfo.deliveryOptions.standard}
                    onChange={handleDeliveryOptionChange}
                    disabled={!editMode}
                  />
                  <span className="ml-2">Standard</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="express"
                    checked={storeInfo.deliveryOptions.express}
                    onChange={handleDeliveryOptionChange}
                    disabled={!editMode}
                  />
                  <span className="ml-2">Express</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="localPickup"
                    checked={storeInfo.deliveryOptions.localPickup}
                    onChange={handleDeliveryOptionChange}
                    disabled={!editMode}
                  />
                  <span className="ml-2">Local Pickup</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Delivery Radius (miles)</label>
              <input
                type="number"
                name="deliveryRadius"
                value={storeInfo.deliveryOptions.deliveryRadius}
                onChange={handleDeliveryRadiusChange}
                className="w-32 border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
        {activeTab === 'social' && (
          <div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Facebook</label>
              <input
                type="text"
                name="facebook"
                value={storeInfo.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={storeInfo.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={storeInfo.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreProfile;
