import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from 'frontend/src/components/ProductCard';

const ProductListing = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    location: ''
  });

  useEffect(() => {
    // Simulate API call with category
    setTimeout(() => {
      // Mock data based on category
      const mockProducts = [
        {
          id: 1,
          name: `${category} Product 1`,
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.5,
          numReviews: 128,
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 2,
          name: `${category} Product 2`,
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.2,
          numReviews: 86,
          vendorId: 2,
          vendorName: 'WearableTech'
        },
        {
          id: 3,
          name: `${category} Product 3`,
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.7,
          numReviews: 215,
          vendorId: 3,
          vendorName: 'EcoFashion'
        },
        {
          id: 4,
          name: `${category} Product 4`,
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.3,
          numReviews: 92,
          vendorId: 4,
          vendorName: 'HomeEssentials'
        }
      ];

      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, [category]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // In a real app, this would sort the products
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // In a real app, this would filter the products
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
        <h1 className="text-2xl font-bold capitalize">{category}</h1>
        <p className="text-gray-600">{products.length} products available</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="space-y-4">
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

        {/* Products */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">All {category} Products</h2>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={() => {}} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;