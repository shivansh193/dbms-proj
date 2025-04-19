import React, { useState } from 'react';
import Rating from 'frontend/src/components/Rating';

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState('newest');

  const productReviews = [
    {
      id: 1,
      product: {
        id: 101,
        name: 'Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'Alex Johnson',
      rating: 5,
      date: 'May 15, 2023',
      comment: 'Amazing sound quality and very comfortable to wear for long periods. The battery life is impressive!',
      helpful: 12,
      unhelpful: 2
    },
    {
      id: 2,
      product: {
        id: 102,
        name: 'Smart Watch with Fitness Tracker',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'Sarah Miller',
      rating: 4,
      date: 'April 28, 2023',
      comment: 'Great watch with many useful features. The step counter and heart rate monitor work well, but the battery could last longer.',
      helpful: 8,
      unhelpful: 1
    },
    {
      id: 3,
      product: {
        id: 103,
        name: 'Organic Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'Michael Chen',
      rating: 5,
      date: 'April 10, 2023',
      comment: 'Very comfortable and true to size. The fabric is soft and seems to be high quality. Will buy again!',
      helpful: 15,
      unhelpful: 0
    }
  ];

  const vendorReviews = [
    {
      id: 1,
      vendor: {
        id: 201,
        name: 'TechGadgets',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'David Wilson',
      rating: 4,
      date: 'March 22, 2023',
      comment: 'Fast shipping and good customer service. The product was exactly as described. Would recommend this vendor.',
      helpful: 5,
      unhelpful: 0
    },
    {
      id: 2,
      vendor: {
        id: 202,
        name: 'FashionHub',
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'Emma Davis',
      rating: 3,
      date: 'March 15, 2023',
      comment: 'The clothes were nice but shipping took longer than expected. Customer service was responsive though.',
      helpful: 3,
      unhelpful: 1
    },
    {
      id: 3,
      vendor: {
        id: 203,
        name: 'HomeEssentials',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      },
      user: 'James Brown',
      rating: 5,
      date: 'February 28, 2023',
      comment: 'Excellent products and super fast delivery! Will definitely buy from this vendor again.',
      helpful: 7,
      unhelpful: 0
    }
  ];

  const filteredReviews = activeTab === 'product' 
    ? productReviews.filter(review => review.rating >= ratingFilter)
    : vendorReviews.filter(review => review.rating >= ratingFilter);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Reviews</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Filter Reviews</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Review Type</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('product')}
                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'product' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
                  >
                    Product Reviews
                  </button>
                  <button
                    onClick={() => setActiveTab('vendor')}
                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'vendor' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
                  >
                    Vendor Reviews
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                      className={`flex items-center w-full text-left px-4 py-2 rounded-md ${ratingFilter === rating ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
                    >
                      <Rating value={rating} size="sm" />
                      <span className="ml-2 text-sm">{rating} star{rating > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {activeTab === 'product' ? 'Product' : 'Vendor'} Reviews
                <span className="text-sm font-normal text-gray-500 ml-2">({filteredReviews.length})</span>
              </h2>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
            
            {sortedReviews.length > 0 ? (
              <div className="space-y-6">
                {sortedReviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src={activeTab === 'product' ? review.product.image : review.vendor.image} 
                          alt={activeTab === 'product' ? review.product.name : review.vendor.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {activeTab === 'product' ? review.product.name : review.vendor.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Rating value={review.rating} size="sm" />
                          <span className="ml-1">• {review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{review.comment}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        By {review.user}
                      </div>
                      <div className="flex space-x-4">
                        <button className="text-sm text-gray-500 hover:text-primary-600 transition flex items-center">
                          <i className="far fa-thumbs-up mr-1"></i>
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-sm text-gray-500 hover:text-primary-600 transition flex items-center">
                          <i className="far fa-thumbs-down mr-1"></i>
                          <span>Unhelpful ({review.unhelpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="far fa-comment-alt text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-medium mb-2">No reviews found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
