import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useApi } from '../utils/api';

export default function Home() {
  // Fetch featured products
  const { data: featuredProducts, error: featuredError, loading: featuredLoading } = 
    useApi('/api/products?featured=true&limit=8', {}, []);
  
  // Fetch popular stores
  const { data: popularStores, error: storesError, loading: storesLoading } = 
    useApi('/api/stores?popular=true&limit=4', {}, []);
  
  // Fetch categories
  const { data: categories, error: categoriesError, loading: categoriesLoading } = 
    useApi('/api/products/categories', {}, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>MarketPlace - Multi-Vendor Marketplace</title>
        <meta name="description" content="Your one-stop destination for multi-vendor shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Products from Vendors Worldwide
              </h1>
              <p className="text-xl mb-8">
                Shop from thousands of vendors in one place. Find unique products, compare prices, and enjoy secure shopping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center">
                  Browse Products
                </Link>
                <Link href="/vendor/register" className="bg-transparent hover:bg-blue-700 border border-white px-6 py-3 rounded-md font-medium text-center">
                  Become a Vendor
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-gray-600">Find products in your favorite categories</p>
            </div>
            
            {categoriesLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : categoriesError ? (
              <div className="text-center text-red-500">Failed to load categories</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(categories?.slice(0, 6) || []).map((category: any) => (
                  <Link 
                    key={category.category} 
                    href={`/products?category=${encodeURIComponent(category.category)}`}
                    className="bg-white rounded-lg shadow-md p-4 text-center transition-transform hover:scale-105"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800">{category.category}</h3>
                    <p className="text-sm text-gray-500 mt-1">{category.count} products</p>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="text-center mt-8">
              <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View All Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked products for you</p>
            </div>
            
            {featuredLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : featuredError ? (
              <div className="text-center text-red-500">Failed to load featured products</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(featuredProducts || []).map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-8">
              <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View All Products
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Popular Stores Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Popular Stores</h2>
              <p className="text-gray-600">Discover top-rated vendors and their products</p>
            </div>
            
            {storesLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : storesError ? (
              <div className="text-center text-red-500">Failed to load popular stores</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(popularStores || []).map((store: any) => (
                  <Link 
                    key={store.id} 
                    href={`/store/${store.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                  >
                    <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
                      {store.bannerUrl && (
                        <Image
                          src={store.bannerUrl}
                          alt={store.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-xl font-bold text-white">{store.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-700">{store.rating || '4.5'}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-600">{store.productCount || '0'} products</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {store.description || 'Visit this store to discover amazing products and deals.'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="text-center mt-8">
              <Link href="/stores" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View All Stores
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Why Shop With Us</h2>
              <p className="text-gray-600">Discover the benefits of our marketplace</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your products delivered quickly with our efficient shipping network.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="text-gray-600">
                  Your transactions are protected with industry-standard security measures.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">
                  Not satisfied with your purchase? Return it hassle-free within 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-6">
                Subscribe to our newsletter for the latest products, deals, and marketplace news.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm mt-4 text-blue-200">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
