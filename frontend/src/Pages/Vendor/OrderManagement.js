import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'MH-1001',
      customer: 'Alex Johnson',
      date: 'May 15, 2023',
      status: 'completed',
      total: 149.98,
      items: [
        { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { id: 2, name: 'Charging Cable', quantity: 2, price: 24.99 }
      ]
    },
    {
      id: 'MH-987',
      customer: 'Sarah Miller',
      date: 'April 28, 2023',
      status: 'shipped',
      total: 89.99,
      items: [
        { id: 3, name: 'Smart Watch', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'MH-876',
      customer: 'Michael Chen',
      date: 'March 10, 2023',
      status: 'processing',
      total: 215.47,
      items: [
        { id: 4, name: 'T-Shirt', quantity: 3, price: 24.99 },
        { id: 5, name: 'Jeans', quantity: 1, price: 59.99 },
        { id: 6, name: 'Belt', quantity: 1, price: 29.99 }
      ]
    },
    {
      id: 'MH-765',
      customer: 'Emma Davis',
      date: 'February 22, 2023',
      status: 'pending',
      total: 39.98,
      items: [
        { id: 7, name: 'Water Bottle', quantity: 2, price: 19.99 }
      ]
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="status-filter" className="font-medium">Filter by status:</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/vendor/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Print order functionality
                          }}
                        >
                          <i className="fas fa-print"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-gray-50">
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Order Items</h3>
                          <div className="border border-gray-200 rounded-md">
                            {order.items.map(item => (
                              <div key={item.id} className="p-4 border-b border-gray-200 last:border-0 flex justify-between">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p>${item.price.toFixed(2)} × {item.quantity}</p>
                                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium mb-2">Update Status</h3>
                            <div className="flex space-x-2">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                onClick={() => {
                                  // Add tracking functionality
                                }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
                              >
                                Add Tracking
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              // Message customer functionality
                            }}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm"
                          >
                            Message Customer
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md mt-6">
          <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;