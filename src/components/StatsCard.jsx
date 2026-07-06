// StatsCard component
import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue }) => {
  const iconColors = {
    sales: 'text-green-500',
    orders: 'text-blue-500',
    customers: 'text-purple-500'
  };

  const TrendIcon = trend === 'up' ? (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5 5 5M7 17l5-5 5 5" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5-5-5M17 7l-5 5-5-5" />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          {trendValue && (
            <div className="flex items-center mt-2 text-sm">
              {TrendIcon}
              <span className={`mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}
              </span>
              <span className="text-gray-500">منذ الشهر الماضي</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${iconColors[icon]}`}>
          {icon === 'sales' && (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2 1.343-2 3-2 3 .895 3 2" />
            </svg>
          )}
          {icon === 'orders' && (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {icon === 'customers' && (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292 7 7 0 10-6.292 7.292A4 4 0 1012 4.354z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;