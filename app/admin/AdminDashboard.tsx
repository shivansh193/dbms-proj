"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/app/components/AdminSidebar";
import DashboardCard from "@/app/components/DashboardCard";
import AnalyticsChart from "@/app/components/AnalyticsChart";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalVendors: number;
  newCustomers: number;
  salesData: {
    week: number[];
    month: number[];
    year: number[];
  };
  pendingVendors: { id: number; name: string; category: string; date: string }[];
}

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalRevenue: 24825,
        totalOrders: 542,
        totalVendors: 86,
        newCustomers: 128,
        salesData: {
          week: [65, 59, 80, 81, 56, 55, 40],
          month: [28, 48, 40, 19, 86, 27, 90, 45, 32, 65, 42, 58, 76, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27],
          year: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
        },
        pendingVendors: [
          { id: 101, name: 'Fresh Foods', category: 'Grocery', date: 'May 15, 2023' },
          { id: 102, name: 'Tech Gadgets', category: 'Electronics', date: 'April 28, 2023' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeRange('week')} 
              className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeRange('month')} 
              className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeRange('year')} 
              className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Year
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
            icon="fas fa-dollar-sign" 
            color="text-green-500" 
            trend="up" 
            percentage="18.7" 
          />
          <DashboardCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon="fas fa-shopping-bag" 
            color="text-blue-500" 
            trend="up" 
            percentage="12.3" 
          />
          <DashboardCard 
            title="Total Vendors" 
            value={stats.totalVendors} 
            icon="fas fa-store" 
            color="text-purple-500" 
            trend="up" 
            percentage="5.6" 
          />
          <DashboardCard 
            title="New Customers" 
            value={stats.newCustomers} 
            icon="fas fa-users" 
            color="text-yellow-500" 
            trend="down" 
            percentage="2.4" 
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <AnalyticsChart data={stats.salesData[timeRange]} timeRange={timeRange} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Pending Vendor Approvals</h2>
          <ul>
            {stats.pendingVendors.map(vendor => (
              <li key={vendor.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span>{vendor.name} <span className="text-gray-500 text-sm">({vendor.category})</span></span>
                <span className="text-gray-500 text-sm">{vendor.date}</span>
                <button className="ml-4 px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">Approve</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
