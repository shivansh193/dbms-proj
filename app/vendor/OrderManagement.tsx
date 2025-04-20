"use client";
import React, { useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "completed" | "shipped" | "processing" | "pending";
  total: number;
  items: OrderItem[];
}

const initialOrders: Order[] = [
  {
    id: "MH-1001",
    customer: "Alex Johnson",
    date: "May 15, 2023",
    status: "completed",
    total: 149.98,
    items: [
      { id: 1, name: "Wireless Headphones", quantity: 1, price: 99.99 },
      { id: 2, name: "Charging Cable", quantity: 2, price: 24.99 }
    ]
  },
  {
    id: "MH-987",
    customer: "Sarah Miller",
    date: "April 28, 2023",
    status: "shipped",
    total: 89.99,
    items: [
      { id: 3, name: "Smart Watch", quantity: 1, price: 89.99 }
    ]
  },
  {
    id: "MH-876",
    customer: "Michael Chen",
    date: "March 10, 2023",
    status: "processing",
    total: 215.47,
    items: [
      { id: 4, name: "T-Shirt", quantity: 3, price: 24.99 },
      { id: 5, name: "Jeans", quantity: 1, price: 59.99 },
      { id: 6, name: "Belt", quantity: 1, price: 29.99 }
    ]
  },
  {
    id: "MH-765",
    customer: "Emma Davis",
    date: "February 22, 2023",
    status: "pending",
    total: 39.98,
    items: [
      { id: 7, name: "Water Bottle", quantity: 2, price: 19.99 }
    ]
  }
];

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = selectedStatus === "all"
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status: Order["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        </div>
      </div>
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-2 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="text-primary-600 hover:underline mr-2"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {expandedOrder === order.id ? "Hide Details" : "View Details"}
                    </button>
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as Order["status"])}
                      className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50 px-4 py-2">
                      <div>
                        <span className="font-semibold">Items:</span>
                        <ul className="ml-4 list-disc">
                          {order.items.map(item => (
                            <li key={item.id}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</li>
                          ))}
                        </ul>
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
  );
};

export default OrderManagement;
