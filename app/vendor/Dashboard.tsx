"use client";
import React, { useState, useEffect } from "react";
import DashboardCard from "../../app/components/DashboardCard";
import AnalyticsChart from "../../app/components/AnalyticsChart";

interface Stats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  conversionRate: number;
  salesData: {
    week: number[];
    month: number[];
    year: number[];
  };
  recentOrders: { id: string; customer: string; date: string; amount: string; status: string }[];
}

const VendorDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalSales: 4825,
        totalOrders: 128,
        totalProducts: 42,
        conversionRate: 3.2,
        salesData: {
          week: [65, 59, 80, 81, 56, 55, 40],
          month: [28, 48, 40, 19, 86, 27, 90, 45, 32, 65, 42, 58, 76, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27],
          year: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
        },
        recentOrders: [
          { id: '#MH-1001', customer: 'Alex Johnson', date: 'May 15, 2023', amount: '$149.98', status: 'Delivered' },
          { id: '#MH-987', customer: 'Sarah Miller', date: 'April 28, 2023', amount: '$89.99', status: 'Shipped' },
          { id: '#MH-876', customer: 'Michael Chen', date: 'March 10, 2023', amount: '$215.47', status: 'Processing' }
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
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
          title="Total Sales" 
          value={`$${stats.totalSales.toLocaleString()}`} 
          icon="fas fa-dollar-sign" 
          color="text-green-500" 
          trend="up" 
          percentage={12.5}
        />
        <DashboardCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon="fas fa-shopping-bag" 
          color="text-blue-500" 
          trend="up" 
          percentage={8.3}
        />
        <DashboardCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon="fas fa-box-open" 
          color="text-purple-500" 
        />
        <DashboardCard 
          title="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          icon="fas fa-percentage" 
          color="text-yellow-500" 
          trend="down" 
          percentage={2.1}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <AnalyticsChart data={stats.salesData[timeRange]} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <ul>
          {stats.recentOrders.map(order => (
            <li key={order.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>{order.customer}</span>
              <span className="text-gray-500 text-sm">{order.date}</span>
              <span className="text-gray-700 font-semibold">{order.amount}</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">{order.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorDashboard;
