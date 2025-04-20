import React from 'react';
import { useRouter } from 'next/router';
import Rating from './Rating';

interface Vendor {
  id: string;
  name: string;
  bannerImage: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  deliveryTime: string;
  productCount: number;
  joinedDate: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const router = useRouter();

  const handleVisitStore = () => {
    router.push(`/vendor/${vendor.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div onClick={() => router.push(`/vendor/${vendor.id}`)} className="cursor-pointer block">
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
      </div>

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

        <button 
          onClick={handleVisitStore}
          className="mt-4 block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition"
        >
          Visit Store
        </button>
      </div>
    </div>
  );
};

export default VendorCard;
