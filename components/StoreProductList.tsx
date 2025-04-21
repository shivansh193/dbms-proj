import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { storeApi } from '../utils/api';
import { useApi } from '../utils/api';

interface StoreProductListProps {
  storeId: number;
}

const StoreProductList: React.FC<StoreProductListProps> = ({ storeId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch store data with products
  const { data, error, loading } = useApi(`/api/stores/${storeId}?page=${currentPage}`, {}, [storeId, currentPage]);
  
  // Extract store, products, categories, and pagination from the response
  const store = data?.store;
  const products = data?.products || [];
  const categories = data?.categories || [];
  const pagination = data?.pagination || { total: 0, pages: 1, page: 1, limit: 10 };
  
  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? products.filter((product: any) => product.category === selectedCategory)
    : products;
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  // Render pagination controls
  const renderPagination = () => {
    if (pagination.pages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.pages}
            className={`px-3 py-1 rounded-md ${
              currentPage === pagination.pages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Store not found!</strong>
        <span className="block sm:inline"> The requested store could not be found.</span>
      </div>
    );
  }
  
  return (
    <div>
      {/* Store Header */}
      <div className="mb-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
          {store.bannerUrl && (
            <img
              src={store.bannerUrl}
              alt={`${store.name} banner`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">{store.name}</h1>
              {store.vendor && (
                <p className="text-white text-opacity-90 mt-2">
                  by {store.vendor.businessName}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {store.description && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">About this store</h2>
            <p className="text-gray-700">{store.description}</p>
          </div>
        )}
      </div>
      
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            
            {categories.map((category: any) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-600 mt-2">
            {selectedCategory
              ? `No products found in the "${selectedCategory}" category.`
              : 'This store has no products yet.'}
          </p>
        </div>
      )}
      
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default StoreProductList;
