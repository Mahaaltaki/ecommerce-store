import React from 'react';
import productsData from '../productsData';

const ProductsStats = () => {
  // Product statistics by category
  const stats = [
    { title: 'الأحذية', count: (productsData || []).filter(p => p?.category === 'Shoes').length, color: 'bg-orange-500' },
    { title: 'ألعاب أطفال', count: (productsData || []).filter(p => p?.category === 'Toys').length, color: 'bg-green-500' },
    { title: 'العطورات', count: (productsData || []).filter(p => p?.category === 'Perfumes').length, color: 'bg-purple-500' },
    { title: 'إكسسوارات', count: (productsData || []).filter(p => p?.category === 'Accessories').length, color: 'bg-blue-500' },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-b-4 border-blue-600 text-right">
            <div className={`w-12 h-12 ${item?.color} rounded-2xl mb-4 flex items-center justify-center text-white text-xl font-bold`}>
              {item?.title?.[0]}
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{item?.title}</p>
            <p className="text-4xl font-black dark:text-white mt-2">{item?.count} <span className="text-sm font-normal text-gray-400">منتج</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsStats;