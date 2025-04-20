"use client";
import React, { useState } from "react";
import Link from "next/link";

interface User {
  name?: string;
}

interface AccountProps {
  user?: User;
  setUser?: (user: User | null) => void;
}

const Account: React.FC<AccountProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinedDate: "January 2022",
  });

  const handleLogout = () => {
    setUser && setUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, this would update the user data on the server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mr-4">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-bold">{user?.name || "User"}</h3>
                <p className="text-sm text-gray-500">Member since {formData.joinedDate}</p>
              </div>
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`block w-full text-left px-4 py-3 rounded-md transition ${activeTab === "profile" ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}
              >
                <i className="far fa-user mr-3"></i> Profile
              </button>
              <Link href="/account/addresses" onClick={() => setActiveTab("addresses")}
                className={`block px-4 py-3 rounded-md transition ${activeTab === "addresses" ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}>
                <i className="far fa-address-book mr-3"></i> Addresses
              </Link>
              <Link href="/account/orders" onClick={() => setActiveTab("orders")}
                className={`block px-4 py-3 rounded-md transition ${activeTab === "orders" ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}>
                <i className="fas fa-shopping-bag mr-3"></i> Orders
              </Link>
              <Link href="/account/payments" onClick={() => setActiveTab("payments")}
                className={`block px-4 py-3 rounded-md transition ${activeTab === "payments" ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}>
                <i className="far fa-credit-card mr-3"></i> Payment Methods
              </Link>
              <Link href="/account/wishlist" onClick={() => setActiveTab("wishlist")}
                className={`block px-4 py-3 rounded-md transition ${activeTab === "wishlist" ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}>
                <i className="far fa-heart mr-3"></i> Wishlist
              </Link>
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 transition text-red-500">
                <i className="fas fa-sign-out-alt mr-3"></i> Logout
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="md:w-3/4">
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md">Edit</button>
                ) : (
                  <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md">Save</button>
                )}
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!editMode}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!editMode}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!editMode}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!editMode}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </form>
            </div>
          )}
          {activeTab === "addresses" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
              <p>Address management UI goes here.</p>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">My Orders</h2>
              <p>Order history UI goes here.</p>
            </div>
          )}
          {activeTab === "payments" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
              <p>Payment methods UI goes here.</p>
            </div>
          )}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
              <p>Wishlist UI goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
