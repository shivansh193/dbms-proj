"use client";
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Placeholder components for each page (replace with real imports as you build them)
const Home = () => <div>Home Page</div>;
const SearchResults = () => <div>Search Results Page</div>;
const ProductListing = () => <div>Product Listing Page</div>;
const ProductDetail = () => <div>Product Detail Page</div>;
const VendorProfile = () => <div>Vendor Profile Page</div>;
const ShoppingCart = () => <div>Shopping Cart Page</div>;
const Checkout = () => <div>Checkout Page</div>;
const Account = () => <div>Account Page</div>;
const LocationPicker = () => <div>Location Picker Page</div>;
const Wishlist = () => <div>Wishlist Page</div>;
const CategoryBrowse = () => <div>Category Browse Page</div>;
const Reviews = () => <div>Reviews Page</div>;
const VendorDashboard = () => <div>Vendor Dashboard Page</div>;
const ProductManagement = () => <div>Product Management Page</div>;
const OrderManagement = () => <div>Order Management Page</div>;
const StoreProfile = () => <div>Store Profile Page</div>;
const VendorAnalytics = () => <div>Vendor Analytics Page</div>;
const PaymentHistory = () => <div>Payment History Page</div>;
const AdminDashboard = () => <div>Admin Dashboard Page</div>;
const VendorManagement = () => <div>Vendor Management Page</div>;
const CategoryManagement = () => <div>Category Management Page</div>;
const ContentManagement = () => <div>Content Management Page</div>;

// Tab definition for demo navigation (replace with Next.js routing as you build real pages)
const tabs = [
  { label: 'Home', key: 'home', component: <Home /> },
  { label: 'Search', key: 'search', component: <SearchResults /> },
  { label: 'Product Listing', key: 'productListing', component: <ProductListing /> },
  { label: 'Product Detail', key: 'productDetail', component: <ProductDetail /> },
  { label: 'Vendor Profile', key: 'vendorProfile', component: <VendorProfile /> },
  { label: 'Cart', key: 'cart', component: <ShoppingCart /> },
  { label: 'Checkout', key: 'checkout', component: <Checkout /> },
  { label: 'Account', key: 'account', component: <Account /> },
  { label: 'Location', key: 'location', component: <LocationPicker /> },
  { label: 'Wishlist', key: 'wishlist', component: <Wishlist /> },
  { label: 'Categories', key: 'categories', component: <CategoryBrowse /> },
  { label: 'Reviews', key: 'reviews', component: <Reviews /> },
  { label: 'Vendor Dashboard', key: 'vendorDashboard', component: <VendorDashboard /> },
  { label: 'Product Management', key: 'productManagement', component: <ProductManagement /> },
  { label: 'Order Management', key: 'orderManagement', component: <OrderManagement /> },
  { label: 'Store Profile', key: 'storeProfile', component: <StoreProfile /> },
  { label: 'Vendor Analytics', key: 'vendorAnalytics', component: <VendorAnalytics /> },
  { label: 'Payment History', key: 'paymentHistory', component: <PaymentHistory /> },
  { label: 'Admin Dashboard', key: 'adminDashboard', component: <AdminDashboard /> },
  { label: 'Vendor Management', key: 'vendorManagement', component: <VendorManagement /> },
  { label: 'Category Management', key: 'categoryManagement', component: <CategoryManagement /> },
  { label: 'Content Management', key: 'contentManagement', component: <ContentManagement /> },
];

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'admin'>('customer');
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={user} userType={userType} cartItems={cartItems} setUser={setUser} setUserType={setUserType} />
      <main className="flex-grow">
        <div className="flex flex-wrap gap-2 p-2 border-b mb-4 bg-white">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-3 py-1 rounded ${activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {tabs.find(tab => tab.key === activeTab)?.component}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;