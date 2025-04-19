import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Customer Pages
import Home from './pages/customer/Home';
import SearchResults from './pages/customer/SearchResults';
import ProductListing from './pages/customer/ProductListing';
import ProductDetail from './pages/customer/ProductDetail';
import VendorProfile from './pages/customer/VendorProfile';
import ShoppingCart from './pages/customer/ShoppingCart';
import Checkout from './pages/customer/Checkout';
import Account from './pages/customer/Account';
import LocationPicker from './pages/customer/LocationPicker';
import Wishlist from './pages/customer/Wishlist';
import CategoryBrowse from './pages/customer/CategoryBrowse';
import Reviews from './pages/customer/Reviews';

// Vendor Pages
import VendorDashboard from './pages/vendor/Dashboard';
import ProductManagement from './pages/vendor/ProductManagement';
import OrderManagement from './pages/vendor/OrderManagement';
import StoreProfile from './pages/vendor/StoreProfile';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import PaymentHistory from './pages/vendor/PaymentHistory';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorManagement from './pages/admin/VendorManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ContentManagement from './pages/admin/ContentManagement';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('customer'); // 'customer', 'vendor', 'admin'

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header user={user} userType={userType} cartItems={cartItems} setUser={setUser} setUserType={setUserType} />
        <main className="flex-grow">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products/:category" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/vendor/:id" element={<VendorProfile />} />
            <Route path="/cart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
            <Route path="/location" element={<LocationPicker />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/categories" element={<CategoryBrowse />} />
            <Route path="/reviews" element={<Reviews />} />

            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<ProductManagement />} />
            <Route path="/vendor/orders" element={<OrderManagement />} />
            <Route path="/vendor/store" element={<StoreProfile />} />
            <Route path="/vendor/analytics" element={<VendorAnalytics />} />
            <Route path="/vendor/payments" element={<PaymentHistory />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/vendors" element={<VendorManagement />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;