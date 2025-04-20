import React, { useState } from 'react';

const StoreProfile = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'TechGadgets',
    description: 'Your one-stop shop for all the latest tech gadgets and accessories. We offer high-quality products with fast shipping and excellent customer service.',
    logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    email: 'support@techgadgets.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94107',
    socialMedia: {
      facebook: 'techgadgets',
      instagram: 'techgadgets',
      twitter: 'techgadgets'
    },
    policies: {
      shipping: 'Free shipping on orders over $50. Standard delivery takes 2-3 business days.',
      returns: '30-day return policy. Items must be unused and in original packaging.',
      payment: 'We accept all major credit cards, PayPal, and Apple Pay.'
    },
    deliveryOptions: {
      standard: true,
      express: true,
      localPickup: false,
      deliveryRadius: 50 // miles
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handlePolicyChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({
      ...prev,
      policies: {
        ...prev.policies,
        [name]: value
      }
    }));
  };

  const handleDeliveryOptionChange = (e) => {
    const { name, checked } = e.target;
    setStoreInfo(prev => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        [name]: checked
      }
    }));
  };

  const handleDeliveryRadiusChange = (e) => {
    const { value } = e.target;
    setStoreInfo(prev => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        deliveryRadius: parseInt(value) || 0
      }
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, this would save to the backend
    console.log('Saved store info:', storeInfo);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Profile</h1>
        {editMode ? (
          <div className="space-x-2">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === 'general' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
              >
                General Information
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === 'contact' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
              >
                Contact Details
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === 'social' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
              >
                Social Media
              </button>
              <button
                onClick={() => setActiveTab('policies')}
                className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === 'policies' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
              >
                Store Policies
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`w-full text-left px-4 py-3 rounded-md transition ${activeTab === 'delivery' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-50'}`}
              >
                Delivery Options
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">General Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={storeInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                  {editMode ? (
                    <textarea
                      name="description"
                      value={storeInfo.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-600">{storeInfo.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Logo</label>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src={storeInfo.logo} 
                          alt="Store logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {editMode && (
                        <button className="text-sm text-primary-600 hover:text-primary-700 transition">
                          Change Logo
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Banner</label>
                    <div className="h-24 rounded-md overflow-hidden bg-gray-100 relative">
                      <img 
                        src={storeInfo.banner} 
                        alt="Store banner" 
                        className="w-full h-full object-cover"
                      />
                      {editMode && (
                        <button className="absolute bottom-2 right-2 bg-white text-primary-600 hover:text-primary-700 text-sm px-3 py-1 rounded-md shadow transition">
                          Change Banner
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={storeInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={storeInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{storeInfo.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={storeInfo.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-600">{storeInfo.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Social Media</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  {editMode ? (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        facebook.com/
                      </span>
                      <input
                        type="text"
                        name="facebook"
                        value={storeInfo.socialMedia.facebook}
                        onChange={handleSocialMediaChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      facebook.com/{storeInfo.socialMedia.facebook}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  {editMode ? (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        instagram.com/
                      </span>
                      <input
                        type="text"
                        name="instagram"
                        value={storeInfo.socialMedia.instagram}
                        onChange={handleSocialMediaChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      instagram.com/{storeInfo.socialMedia.instagram}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  {editMode ? (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        twitter.com/
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        value={storeInfo.socialMedia.twitter}
                        onChange={handleSocialMediaChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      twitter.com/{storeInfo.socialMedia.twitter}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Store Policies</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Policy</label>
                  {editMode ? (
                    <textarea
                      name="shipping"
                      value={storeInfo.policies.shipping}
                      onChange={handlePolicyChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-600">{storeInfo.policies.shipping}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Policy</label>
                  {editMode ? (
                    <textarea
                      name="returns"
                      value={storeInfo.policies.returns}
                      onChange={handlePolicyChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-600">{storeInfo.policies.returns}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Methods</label>
                  {editMode ? (
                    <textarea
                      name="payment"
                      value={storeInfo.policies.payment}
                      onChange={handlePolicyChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-600">{storeInfo.policies.payment}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Delivery Options</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Available Delivery Methods</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="standard-shipping"
                        name="standard"
                        type="checkbox"
                        checked={storeInfo.deliveryOptions.standard}
                        onChange={handleDeliveryOptionChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="standard-shipping" className="ml-2 block text-sm text-gray-700">
                        Standard Shipping
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="express-shipping"
                        name="express"
                        type="checkbox"
                        checked={storeInfo.deliveryOptions.express}
                        onChange={handleDeliveryOptionChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="express-shipping" className="ml-2 block text-sm text-gray-700">
                        Express Shipping
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="local-pickup"
                        name="localPickup"
                        type="checkbox"
                        checked={storeInfo.deliveryOptions.localPickup}
                        onChange={handleDeliveryOptionChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="local-pickup" className="ml-2 block text-sm text-gray-700">
                        Local Pickup
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Radius (miles) {!storeInfo.deliveryOptions.standard && !storeInfo.deliveryOptions.express && '(Not applicable)'}
                  </label>
                  {editMode && (storeInfo.deliveryOptions.standard || storeInfo.deliveryOptions.express) ? (
                    <input
                      type="number"
                      min="0"
                      value={storeInfo.deliveryOptions.deliveryRadius}
                      onChange={handleDeliveryRadiusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {(storeInfo.deliveryOptions.standard || storeInfo.deliveryOptions.express) 
                        ? `${storeInfo.deliveryOptions.deliveryRadius} miles` 
                        : 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;