import React from 'react';

const DashboardCard = ({ title, value, icon, color, trend, percentage }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
  
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <i className={`${icon} ${color} text-lg`}></i>
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`${trendColor} text-sm font-medium`}>
            <i className={`${trendIcon} mr-1`}></i> {percentage}%
          </span>
          <span className="text-gray-500 text-sm ml-2">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;