import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <Link to={`/vendor/${vendor.id}`} className="block">
        <div className="relative pb-3/4 h-48">
          <img 
            src={vendor.bannerImage} 
            alt={vendor.name} 
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-end">
              <div className="w-16 h-16 rounded-full border-2 border-white bg-white overflow-hidden mr-3">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{vendor.name}</h3>
                <div className="flex items-center">
                  <Rating value={vendor.rating} />
                  <span className="text-white text-sm ml-1">({vendor.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <i className="fas fa-map-marker-alt mr-1"></i>
              <span>{vendor.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <i className="fas fa-tag mr-1"></i>
              <span>{vendor.category}</span>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
            {vendor.deliveryTime}
          </span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Products: {vendor.productCount}</span>
            <span className="text-gray-600">Since: {vendor.joinedDate}</span>
          </div>
        </div>
        
        <Link 
          to={`/vendor/${vendor.id}`}
          className="mt-4 block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;