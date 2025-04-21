import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/AppContext';
import ShoppingCart from './ShoppingCart';

const Header: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, customer, logout, cartItemCount, toggleCart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">MarketPlace</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className={`text-gray-600 hover:text-blue-600 ${router.pathname === '/products' ? 'text-blue-600 font-medium' : ''}`}>
                Products
              </Link>
              <Link href="/stores" className={`text-gray-600 hover:text-blue-600 ${router.pathname === '/stores' ? 'text-blue-600 font-medium' : ''}`}>
                Stores
              </Link>
              <Link href="/categories" className={`text-gray-600 hover:text-blue-600 ${router.pathname === '/categories' ? 'text-blue-600 font-medium' : ''}`}>
                Categories
              </Link>
              {isLoggedIn && (
                <Link href="/vendor/dashboard" className={`text-gray-600 hover:text-blue-600 ${router.pathname.startsWith('/vendor') ? 'text-blue-600 font-medium' : ''}`}>
                  Vendor Dashboard
                </Link>
              )}
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Link href="/search" className="p-2 text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              
              {/* Cart Button */}
              <button 
                className="p-2 text-gray-600 hover:text-blue-600 relative"
                onClick={toggleCart}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button 
                    className="flex items-center text-gray-700 hover:text-blue-600"
                    onClick={toggleMenu}
                  >
                    <span className="mr-1">{customer?.name?.split(' ')[0] || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                          router.push('/');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="text-gray-600 hover:text-blue-600">
                    Sign In
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link href="/register" className="text-gray-600 hover:text-blue-600">
                    Register
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-3 border-t border-gray-200">
              <Link href="/products" className="block py-2 text-gray-600 hover:text-blue-600">
                Products
              </Link>
              <Link href="/stores" className="block py-2 text-gray-600 hover:text-blue-600">
                Stores
              </Link>
              <Link href="/categories" className="block py-2 text-gray-600 hover:text-blue-600">
                Categories
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/account" className="block py-2 text-gray-600 hover:text-blue-600">
                    My Account
                  </Link>
                  <Link href="/orders" className="block py-2 text-gray-600 hover:text-blue-600">
                    Orders
                  </Link>
                  <Link href="/vendor/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">
                    Vendor Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      router.push('/');
                    }}
                    className="block w-full text-left py-2 text-gray-600 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 text-gray-600 hover:text-blue-600">
                    Sign In
                  </Link>
                  <Link href="/register" className="block py-2 text-gray-600 hover:text-blue-600">
                    Register
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>
      
      {/* Shopping Cart Sidebar */}
      <ShoppingCart />
    </>
  );
};

export default Header;
