import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from 'frontend/src/components/ProductCard';
import VendorCard from 'frontend/src/components/VendorCard';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState({ products: [], vendors: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    location: ''
  });

  useEffect(() => {
    // Simulate API call with search query
    setTimeout(() => {
      // Mock data based on search query
      const mockProducts = [
        {
          id: 1,
          name: `Wireless ${query} Headphones`,
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.5,
          numReviews: 128,
          vendorId: 1,
          vendorName: 'TechGadgets',
          category: 'Electronics'
        },
        {
          id: 2,
          name: `Smart ${query} Watch`,
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.2,
          numReviews: 86,
          vendorId: 2,
          vendorName: 'WearableTech',
          category: 'Electronics'
        }
      ];

      const mockVendors = [
        {
          id: 1,
          name: `${query} Tech Store`,
          bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.5,
          reviews: 342,
          location: 'San Francisco, CA',
          category: 'Electronics',
          deliveryTime: '2-3 days'
        }
      ];

      setResults({
        products: mockProducts,
        vendors: mockVendors
      });
      setLoading(false);
    }, 800);
  }, [query]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // In a real app, this would filter the results
    console.log('Applying filters:', filters);
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Search Results for "{query}"</h1>
        <p className="text-gray-600">
          {results.products.length + results.vendors.length} results found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any Price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4+">4 Stars & Up</option>
                  <option value="3+">3 Stars & Up</option>
                  <option value="2+">2 Stars & Up</option>
                  <option value="1+">1 Star & Up</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any Location</option>
                  <option value="local">Near Me</option>
                  <option value="us">United States</option>
                  <option value="international">International</option>
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:w-3/4">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-medium ${activeTab === 'products' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Products ({results.products.length})
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-4 py-2 font-medium ${activeTab === 'vendors' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Vendors ({results.vendors.length})
            </button>
          </div>

          {activeTab === 'products' ? (
            results.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    addToCart={() => {}} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )
          ) : (
            results.vendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.vendors.map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-store text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-medium mb-2">No vendors found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;