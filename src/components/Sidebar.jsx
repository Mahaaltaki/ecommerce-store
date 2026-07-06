// Sidebar component
import React from 'react';

const Sidebar = ({ activeItem, onItemClick, isDarkMode, onDarkModeToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard' },
    { id: 'orders', label: 'الطلبات', icon: 'orders' },
    { id: 'products', label: 'المنتجات', icon: 'products' },
    { id: 'customers', label: 'العملاء', icon: 'customers' },
    { id: 'analytics', label: 'التحليلات', icon: 'analytics' },
    { id: 'settings', label: 'الإعدادات', icon: 'settings' }
  ];

  const renderIcon = (iconType) => {
    const icons = {
      dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2 4 4 8-8 4 4" /></svg>,
      orders: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
      products: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7l8 4" /></svg>,
      customers: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292 7 7 0 10-6.292 7.292A4 4 0 1012 4.354z" /></svg>,
      analytics: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6m12 6v-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      settings: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0M14.74 5.755l-2.121 6.364L4.45 9.27a2 2 0 00-1.414 0L1.8 7.99a2 2 0 00-2 2v4a2 2 0 002 2h4l1.38-4.156z" /></svg>
    };
    return icons[iconType] || null;
  };

  return (
    <aside className={`
      fixed inset-y-0 right-0 z-30 w-64 
      bg-white dark:bg-gray-800 
      shadow-lg transform transition-transform duration-300 ease-in-out
      ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto
    `}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-blue-600 dark:bg-blue-700">
        <h1 className="text-white text-xl font-bold">متجر إلكتروني</h1>
      </div>

      {/* Navigation list */}
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`
                flex items-center w-full px-6 py-3 justify-end
                transition-colors duration-200
                ${activeItem === item.id 
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              <span className="font-medium">{item.label}</span>
              <span className="mr-3">{renderIcon(item.icon)}</span>
            </button>
          ))}
        </nav>

      {/* Dark mode toggle button */}
      <div className="absolute bottom-8 right-0 left-0 px-6">
        <button
          onClick={onDarkModeToggle}
          className="flex items-center justify-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.396 6.396l-.707-.707m12.708 12.708l-.707-.707M6.343 17.657l-.707.707M16.95 6.343l.707-.707M17.657 17.657l.707.707M6.343 6.343l.707.707" />
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          <span>{isDarkMode ? 'الوضع العادي' : 'الوضع الليلي'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;