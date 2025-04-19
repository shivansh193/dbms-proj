import React, { useState, useEffect } from 'react';
import DashboardCard from 'frontend/src/components/DashboardCard';
import AnalyticsChart from 'frontend/src/components/AnalyticsChart';

const VendorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate API call
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

  if (loading) {
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
          percentage="12.5" 
        />
        <DashboardCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon="fas fa-shopping-bag" 
          color="text-blue-500" 
          trend="up" 
          percentage="8.3" 
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
          percentage="2.1" 
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
                label: 'Sales',
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
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {stats.recentOrders.map(order => (
              <div key={order.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{order.customer}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{order.date}</span>
                  <span className="font-medium">{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-primary-600 hover:text-primary-700 transition">
            View All Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                  <img 
                    src={`https://source.unsplash.com/random/100x100/?product,${item}`} 
                    alt={`Product ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Product {item}</h4>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${(item * 49.99).toFixed(2)}</span>
                    <span>{item * 15} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>
          <div className="space-y-4">
            {[1, 2].map(item => (
              <div key={item} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                    <img 
                      src={`https://source.unsplash.com/random/100x100/?product,${item + 3}`} 
                      alt={`Product ${item + 3}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Product {item + 3}</h4>
                    <p className="text-sm text-gray-600">Only {item} left in stock</p>
                  </div>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 transition">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
