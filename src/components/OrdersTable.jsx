// OrdersTable component
import React from 'react';

// Sample orders data
const mockOrders = [
  { id: '#ORD-001', customer: 'أحمد محمد', date: '2024-01-15', status: 'completed', total: 1250 },
  { id: '#ORD-002', customer: 'سارة خالد', date: '2024-01-14', status: 'pending', total: 850 },
  { id: '#ORD-003', customer: 'محمود علي', date: '2024-01-14', status: 'shipped', total: 2300 },
  { id: '#ORD-004', customer: 'فاطمة حسن', date: '2024-01-13', status: 'completed', total: 450 },
  { id: '#ORD-005', customer: 'خالد إبراهيم', date: '2024-01-12', status: 'cancelled', total: 0 },
];

const OrdersTable = () => {
  // Determine status colors
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
      shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: 'مكتمل',
      pending: 'قيد المعالجة',
      shipped: 'تم الشحن',
      cancelled: 'ملغي'
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">آخر الطلبات</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {mockOrders.map((order) => (
              <tr key={order?.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{order?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{order?.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{order?.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order?.status)}`}>
                    {getStatusLabel(order?.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                  {order?.total > 0 ? `${order?.total} ج.م` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View more button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
          عرض جميع الطلبات
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;