import React, { useState, useEffect } from 'react';
import ProductCard from 'frontend/src/components/ProductCard';
import VendorCard from 'frontend/src/components/VendorCard';
import CategoryCard from 'frontend/src/components/CategoryCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularVendors, setPopularVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockProducts = [
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          price: 99.99,
          originalPrice: 129.99,
          discount: 23,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.5,
          numReviews: 128,
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 2,
          name: 'Smart Watch with Fitness Tracker',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.2,
          numReviews: 86,
          vendorId: 2,
          vendorName: 'WearableTech'
        },
        {
          id: 3,
          name: 'Organic Cotton T-Shirt',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.7,
          numReviews: 215,
          vendorId: 3,
          vendorName: 'EcoFashion'
        },
        {
          id: 4,
          name: 'Stainless Steel Water Bottle',
          price: 19.99,
          originalPrice: 24.99,
          discount: 20,
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.3,
          numReviews: 92,
          vendorId: 4,
          vendorName: 'HomeEssentials'
        }
      ];

      const mockVendors = [
        {
          id: 1,
          name: 'TechGadgets',
          bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.5,
          reviews: 342,
          location: 'San Francisco, CA',
          category: 'Electronics',
          deliveryTime: '2-3 days',
          productCount: 78,
          joinedDate: '2020'
        },
        {
          id: 2,
          name: 'FashionHub',
          bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          logo: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.7,
          reviews: 512,
          location: 'New York, NY',
          category: 'Fashion',
          deliveryTime: '1-2 days',
          productCount: 145,
          joinedDate: '2019'
        }
      ];

      const mockCategories = [
        {
          id: 1,
          name: 'Electronics',
          slug: 'electronics',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          productCount: 245
        },
        {
          id: 2,
          name: 'Fashion',
          slug: 'fashion',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          productCount: 389
        },
        {
          id: 3,
          name: 'Home & Garden',
          slug: 'home-garden',
          image: 'https://images.unsplash.com/photo-1583845112203-4541b01c57a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          productCount: 176
        },
        {
          id: 4,
          name: 'Health & Beauty',
          slug: 'health-beauty',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          productCount: 132
        }
      ];

      setFeaturedProducts(mockProducts);
      setPopularVendors(mockVendors);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const addToCart = (product) => {
    // In a real app, this would update the global cart state
    console.log('Added to cart:', product);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-10 h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 to-transparent z-10 flex items-center">
          <div className="container mx-auto px-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Amazing Products</h1>
            <p className="text-xl text-gray-200 mb-6">Shop from thousands of vendors near you</p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md text-lg transition">
              Shop Now
            </button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
          alt="Marketplace" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <a href="/categories" className="text-primary-600 hover:text-primary-700 transition">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <a href="/search" className="text-primary-600 hover:text-primary-700 transition">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Popular Vendors */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Vendors</h2>
          <a href="/vendors" className="text-primary-600 hover:text-primary-700 transition">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl p-8 mb-12 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Special Discount</h3>
            <p className="text-lg">Get 20% off on your first order. Use code: WELCOME20</p>
          </div>
          <button className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Recently Viewed - Would be dynamic in a real app */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={`recent-${product.id}`} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;