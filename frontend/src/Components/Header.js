import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from 'src/SearchBar';

const Header = ({ user, userType, cartItems, setUser, setUserType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setUserType('customer');
    navigate('/');
  };

  return (
    <header className="bg-dark-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">MarketHub</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block w-1/3">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {userType === 'customer' && (
              <>
                <Link to="/" className="hover:text-primary-400 transition">Home</Link>
                <Link to="/categories" className="hover:text-primary-400 transition">Categories</Link>
                <Link to="/wishlist" className="hover:text-primary-400 transition">Wishlist</Link>
              </>
            )}
            {userType === 'vendor' && (
              <>
                <Link to="/vendor/dashboard" className="hover:text-primary-400 transition">Dashboard</Link>
                <Link to="/vendor/products" className="hover:text-primary-400 transition">Products</Link>
                <Link to="/vendor/orders" className="hover:text-primary-400 transition">Orders</Link>
              </>
            )}
            {userType === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="hover:text-primary-400 transition">Dashboard</Link>
                <Link to="/admin/vendors" className="hover:text-primary-400 transition">Vendors</Link>
                <Link to="/admin/categories" className="hover:text-primary-400 transition">Categories</Link>
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {userType === 'customer' && (
              <Link to="/cart" className="relative p-2 hover:text-primary-400 transition">
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <span className="text-white font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <i className={`fas fa-chevron-down text-xs transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`}></i>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link 
                      to={userType === 'customer' ? '/account' : userType === 'vendor' ? '/vendor/dashboard' : '/admin/dashboard'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Account
                    </Link>
                    {userType === 'customer' && (
                      <>
                        <Link 
                          to="/wishlist" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <Link 
                          to="/orders" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link 
                  to="/account/login" 
                  className="px-4 py-2 rounded-md hover:bg-dark-700 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/account/register" 
                  className="px-4 py-2 bg-primary-600 rounded-md hover:bg-primary-700 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-800 mt-3 p-4 rounded-lg">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-primary-400 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/categories" className="hover:text-primary-400 transition" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
              <Link to="/wishlist" className="hover:text-primary-400 transition" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
              {!user && (
                <>
                  <Link 
                    to="/account/login" 
                    className="block text-center py-2 rounded-md hover:bg-dark-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/account/register" 
                    className="block text-center py-2 bg-primary-600 rounded-md hover:bg-primary-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;