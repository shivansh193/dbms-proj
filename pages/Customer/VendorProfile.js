import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from 'frontend/src/components/ProductCard';
import Rating from 'frontend/src/components/Rating';

const VendorProfile = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    // Simulate API call with vendor id
    setTimeout(() => {
      // Mock vendor data
      const mockVendor = {
        id: 1,
        name: 'TechGadgets',
        description: 'Your one-stop shop for all the latest tech gadgets and accessories. We offer high-quality products with fast shipping and excellent customer service.',
        bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        reviews: 342,
        location: 'San Francisco, CA',
        category: 'Electronics',
        deliveryTime: '2-3 days',
        joinedDate: 'January 2020',
        policies: {
          shipping: 'Free shipping on orders over $50. Standard delivery takes 2-3 business days.',
          returns: '30-day return policy. Items must be unused and in original packaging.',
          payment: 'We accept all major credit cards, PayPal, and Apple Pay.'
        },
        contact: {
          email: 'support@techgadgets.com',
          phone: '+1 (555) 123-4567',
          address: '123 Tech Street, San Francisco, CA 94107'
        }
      };

      // Mock products for this vendor
      const mockProducts = [
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          price: 99.99,
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
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 3,
          name: 'Portable Bluetooth Speaker',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.1,
          numReviews: 64,
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 4,
          name: 'Wireless Charging Pad',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.3,
          numReviews: 92,
          vendorId: 1,
          vendorName: 'TechGadgets'
        }
      ];

      setVendor(mockVendor);
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, [id]);

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
    <div className="container mx-auto px-4">
      {/* Vendor Banner */}
      <div className="relative rounded-t-lg overflow-hidden h-64">
        <img 
          src={vendor.bannerImage} 
          alt={vendor.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex items-end">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden mr-4">
              <img 
                src={vendor.logo} 
                alt={vendor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{vendor.name}</h1>
              <div className="flex items-center">
                <Rating value={vendor.rating} color="text-yellow-400" />
                <span className="text-white ml-2">({vendor.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold mb-4">About {vendor.name}</h2>
            <p className="text-gray-600 mb-6">{vendor.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-2">Store Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-gray-400 mr-2 mt-1"></i>
                    <span>{vendor.location}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-tag text-gray-400 mr-2 mt-1"></i>
                    <span>{vendor.category}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-truck text-gray-400 mr-2 mt-1"></i>
                    <span>Delivery: {vendor.deliveryTime}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-calendar-alt text-gray-400 mr-2 mt-1"></i>
                    <span>Member since {vendor.joinedDate}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Policies</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-shipping-fast text-gray-400 mr-2 mt-1"></i>
                    <span>{vendor.policies.shipping}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-exchange-alt text-gray-400 mr-2 mt-1"></i>
                    <span>{vendor.policies.returns}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-credit-card text-gray-400 mr-2 mt-1"></i>
                    <span>{vendor.policies.payment}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-4">Contact Vendor</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-envelope text-gray-400 mr-3 mt-1"></i>
                  <span>{vendor.contact.email}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone-alt text-gray-400 mr-3 mt-1"></i>
                  <span>{vendor.contact.phone}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-gray-400 mr-3 mt-1"></i>
                  <span>{vendor.contact.address}</span>
                </li>
              </ul>
              <button className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-medium ${activeTab === 'products' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-6 py-3 font-medium ${activeTab === 'about' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={() => {}} 
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-4xl font-bold mr-3">{vendor.rating}</span>
                <div>
                  <Rating value={vendor.rating} />
                  <span className="text-gray-500 text-sm">Based on {vendor.reviews} reviews</span>
                </div>
              </div>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition">
              Write a Review
            </button>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map(review => (
              <div key={review} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Customer {review}</h4>
                  <span className="text-sm text-gray-500">May {10 + review}, 2023</span>
                </div>
                <Rating value={5 - review * 0.5} />
                <p className="mt-2 text-gray-600">
                  {review === 1 ? 'Excellent products and fast shipping! Will definitely buy from this vendor again.' : 
                   review === 2 ? 'Good quality products but shipping took longer than expected.' : 
                   'Average experience. Some items were not as described.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">More About {vendor.name}</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              {vendor.name} was founded in {vendor.joinedDate} with a mission to provide high-quality tech products at affordable prices. 
              Our team is passionate about technology and committed to excellent customer service.
            </p>
            <p className="mt-4">
              We carefully select all our products to ensure they meet our high standards for quality and performance. 
              All items come with a manufacturer's warranty and our own satisfaction guarantee.
            </p>
            <h3 className="text-lg font-medium mt-6 mb-2">Our Values</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customer satisfaction is our top priority</li>
              <li>Only sell products we believe in</li>
              <li>Fast and reliable shipping</li>
              <li>Transparent and honest business practices</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;