import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Account = ({ user, setUser }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop() || 'profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinedDate: 'January 2022'
  });

  const handleLogout = () => {
    setUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, this would update the user data on the server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mr-4">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-bold">{user?.name || 'User'}</h3>
                <p className="text-sm text-gray-500">Member since {formData.joinedDate}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link 
                to="/account/profile" 
                onClick={() => setActiveTab('profile')}
                className={`block px-4 py-3 rounded-md transition ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
              >
                <i className="far fa-user mr-3"></i> Profile
              </Link>
              <Link 
                to="/account/addresses" 
                onClick={() => setActiveTab('addresses')}
                className={`block px-4 py-3 rounded-md transition ${activeTab === 'addresses' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
              >
                <i className="far fa-address-book mr-3"></i> Addresses
              </Link>
              <Link 
                to="/account/orders" 
                onClick={() => setActiveTab('orders')}
                className={`block px-4 py-3 rounded-md transition ${activeTab === 'orders' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
              >
                <i className="fas fa-shopping-bag mr-3"></i> Orders
              </Link>
              <Link 
                to="/account/payments" 
                onClick={() => setActiveTab('payments')}
                className={`block px-4 py-3 rounded-md transition ${activeTab === 'payments' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
              >
                <i className="far fa-credit-card mr-3"></i> Payment Methods
              </Link>
              <Link 
                to="/account/wishlist" 
                onClick={() => setActiveTab('wishlist')}
                className={`block px-4 py-3 rounded-md transition ${activeTab === 'wishlist' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
              >
                <i className="far fa-heart mr-3"></i> Wishlist
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 transition text-red-500"
              >
                <i className="fas fa-sign-out-alt mr-3"></i> Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="text-primary-600 hover:text-primary-700 transition"
                  >
                    <i className="far fa-edit mr-2"></i> Edit
                  </button>
                ) : (
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
                )}
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex">
                    <span className="w-32 font-medium">Name:</span>
                    <span>{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium">Member since:</span>
                    <span>{formData.joinedDate}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Saved Addresses</h2>
                <button className="text-primary-600 hover:text-primary-700 transition">
                  <i className="fas fa-plus mr-2"></i> Add New
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-md p-4 relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="text-gray-400 hover:text-primary-600 transition">
                      <i className="far fa-edit"></i>
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <h3 className="font-medium mb-2">John Doe</h3>
                  <p className="text-gray-600 text-sm">123 Main Street</p>
                  <p className="text-gray-600 text-sm">Apartment 4B</p>
                  <p className="text-gray-600 text-sm">New York, NY 10001</p>
                  <p className="text-gray-600 text-sm">United States</p>
                  <p className="text-gray-600 text-sm mt-2">Phone: +1 (555) 123-4567</p>
                  <span className="inline-block mt-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Default
                  </span>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="text-gray-400 hover:text-primary-600 transition">
                      <i className="far fa-edit"></i>
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <h3 className="font-medium mb-2">John Doe</h3>
                  <p className="text-gray-600 text-sm">456 Business Ave</p>
                  <p className="text-gray-600 text-sm">Suite 200</p>
                  <p className="text-gray-600 text-sm">San Francisco, CA 94107</p>
                  <p className="text-gray-600 text-sm">United States</p>
                  <p className="text-gray-600 text-sm mt-2">Phone: +1 (555) 987-6543</p>
                  <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 transition">
                    Set as Default
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#MH-1001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$149.98</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                        <Link to="/account/orders/1001" className="hover:text-primary-700 transition">View</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#MH-987</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 28, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Shipped</span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">215.47</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
<Link to="/account/orders/876" className="hover:text-primary-700 transition">View</Link>
</td>
</tr>
</tbody>
</table>
</div>
</div>
)}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Payment Methods</h2>
            <button className="text-primary-600 hover:text-primary-700 transition">
              <i className="fas fa-plus mr-2"></i> Add New
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4 relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="text-gray-400 hover:text-primary-600 transition">
                  <i className="far fa-edit"></i>
                </button>
                <button className="text-gray-400 hover:text-red-600 transition">
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
              <div className="flex items-center">
                <i className="far fa-credit-card text-2xl text-gray-500 mr-4"></i>
                <div>
                  <h3 className="font-medium">Visa ending in 4242</h3>
                  <p className="text-gray-600 text-sm">Expires 04/2025</p>
                </div>
              </div>
              <span className="inline-block mt-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Default
              </span>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="text-gray-400 hover:text-primary-600 transition">
                  <i className="far fa-edit"></i>
                </button>
                <button className="text-gray-400 hover:text-red-600 transition">
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
              <div className="flex items-center">
                <i className="fab fa-paypal text-2xl text-blue-500 mr-4"></i>
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-gray-600 text-sm">john.doe@example.com</p>
                </div>
              </div>
              <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 transition">
                Set as Default
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'wishlist' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards would go here */}
            <div className="text-center py-12">
              <i className="far fa-heart text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Save items you love for easy access later</p>
              <Link 
                to="/" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>);
};

export default Account;