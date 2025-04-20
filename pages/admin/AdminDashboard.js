import React, { useState, useEffect } from 'react';
import AdminSidebar from 'frontend/src/components/AdminSidebar';
import DashboardCard from 'frontend/src/components/DashboardCard';
import AnalyticsChart from 'frontend/src/components/AnalyticsChart';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate API call
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

  if (loading) {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnalyticsChart 
              type="line" 
              data={{
                labels: timeRange === 'week' 
                  ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  : timeRange === 'month' 
                    ? Array.from({length: 30}, (_, i) => (i + 1).toString())
                    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                  label: 'Revenue',
                  data: stats.salesData[timeRange],
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  borderColor: 'rgba(99, 102, 241, 1)',
                  tension: 0.4,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Vendors Pending Approval</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {stats.pendingVendors.length} New
              </span>
            </div>
            <div className="space-y-4">
              {stats.pendingVendors.map(vendor => (
                <div key={vendor.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{vendor.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {vendor.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Applied on {vendor.date}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-sm bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-md transition">
                      Approve
                    </button>
                    <button className="text-sm bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-md transition">
                      Reject
                    </button>
                    <button className="text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 px-3 py-1 rounded-md transition">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-primary-600 hover:text-primary-700 transition">
              View All Pending Vendors
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { action: 'New order #MH-1042', time: '2 minutes ago', icon: 'fas fa-shopping-bag', color: 'text-blue-500' },
                { action: 'Vendor "Fashion Hub" registered', time: '15 minutes ago', icon: 'fas fa-store', color: 'text-purple-500' },
                { action: 'New customer registered', time: '1 hour ago', icon: 'fas fa-user-plus', color: 'text-green-500' },
                { action: 'Order #MH-1041 delivered', time: '3 hours ago', icon: 'fas fa-truck', color: 'text-yellow-500' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-full ${activity.color} bg-opacity-10 mr-3`}>
                    <i className={`${activity.icon} ${activity.color}`}></i>
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Vendors</h3>
            <div className="space-y-4">
              {[
                { name: 'TechGadgets', sales: 4825, products: 42, rating: 4.5 },
                { name: 'FashionHub', sales: 3892, products: 78, rating: 4.7 },
                { name: 'HomeEssentials', sales: 2876, products: 35, rating: 4.3 }
              ].map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Rating value={vendor.rating} size="xs" />
                        <span className="ml-1">({vendor.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${vendor.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{vendor.products} products</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;