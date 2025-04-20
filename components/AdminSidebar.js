import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="bg-dark-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Admin Panel</h2>
      </div>
      
      <nav className="space-y-1">
        <Link 
          to="/admin/dashboard" 
          className={`flex items-center px-4 py-3 rounded-md transition ${isActive('dashboard') ? 'bg-primary-600' : 'hover:bg-dark-700'}`}
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/admin/vendors" 
          className={`flex items-center px-4 py-3 rounded-md transition ${isActive('vendors') ? 'bg-primary-600' : 'hover:bg-dark-700'}`}
        >
          <i className="fas fa-store mr-3"></i>
          <span>Vendor Management</span>
        </Link>
        
        <Link 
          to="/admin/categories" 
          className={`flex items-center px-4 py-3 rounded-md transition ${isActive('categories') ? 'bg-primary-600' : 'hover:bg-dark-700'}`}
        >
          <i className="fas fa-tags mr-3"></i>
          <span>Category Management</span>
        </Link>
        
        <Link 
          to="/admin/content" 
          className={`flex items-center px-4 py-3 rounded-md transition ${isActive('content') ? 'bg-primary-600' : 'hover:bg-dark-700'}`}
        >
          <i className="fas fa-images mr-3"></i>
          <span>Content Management</span>
        </Link>
        
        <Link 
          to="/admin/settings" 
          className={`flex items-center px-4 py-3 rounded-md transition ${isActive('settings') ? 'bg-primary-600' : 'hover:bg-dark-700'}`}
        >
          <i className="fas fa-cog mr-3"></i>
          <span>Settings</span>
        </Link>
      </nav>
      
      <div className="mt-8 pt-4 border-t border-dark-700">
        <Link 
          to="/" 
          className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition"
        >
          <i className="fas fa-arrow-left mr-3"></i>
          <span>Back to Store</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;