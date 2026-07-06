// SalesChart component
import React, { useMemo } from 'react';

// Sample monthly sales data
const monthlySales = [
  { month: 'يناير', sales: 4500 },
  { month: 'فبراير', sales: 5200 },
  { month: 'مارس', sales: 4800 },
  { month: 'أبريل', sales: 6100 },
  { month: 'مايو', sales: 5500 },
  { month: 'يونيو', sales: 6800 },
  { month: 'يوليو', sales: 7200 },
  { month: 'أغسطس', sales: 6900 },
  { month: 'سبتمبر', sales: 7500 },
  { month: 'أكتوبر', sales: 8200 },
  { month: 'نوفمبر', sales: 9100 },
  { month: 'ديسمبر', sales: 10500 }
];

const SalesChart = () => {
  // Calculate max sales value to determine column height
  const maxSales = useMemo(() => {
    return Math.max(...monthlySales.map(item => item?.sales || 0), 1);
  }, []);

  // Calculate total sales
  const totalSales = useMemo(() => {
    return monthlySales.reduce((sum, item) => sum + (item?.sales || 0), 0);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">المبيعات الشهرية</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          إجمالي المبيعات: <span className="font-bold text-blue-600">{totalSales.toLocaleString()} ج.م</span>
        </p>
      </div>

      {/* Charts */}
      <div className="flex items-end justify-between h-64 px-4" style={{ direction: 'ltr' }}>
        {monthlySales.map((item, index) => {
          const height = ((item?.sales || 0) / maxSales) * 100;
          return (
            <div key={item?.month} className="flex flex-col items-center flex-1">
              <div className="w-full flex justify-center">
                <div
                  className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-t-lg transition-all duration-500 ease-out hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                  title={`${item?.month}: ${item?.sales.toLocaleString()} ج.م`}
                ></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item?.month}</span>
            </div>
          );
        })}
      </div>

      {/* Chart axis line */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          المبيعات تزداد بشكل ملحوظ خلال العام
        </p>
      </div>
    </div>
  );
};

export default SalesChart;