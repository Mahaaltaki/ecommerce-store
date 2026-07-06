// Navbar component
import React from 'react';

const Navbar = ({ user, onSearch, searchQuery, isSidebarOpen, onSidebarToggle }) => {
  return (
    <nav className="
      bg-white dark:bg-gray-800 
      shadow-md 
      flex items-center justify-between 
      px-4 md:px-6 py-4 
      mr-64 ltr:ml-64
    ">
      {/* Mobile sidebar toggle button */}
      <button
        onClick={onSidebarToggle}
        className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-lg mx-4 lg:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery || ''}
            onChange={(e) => onSearch(e?.target?.value || '')}
            className="
              w-full px-4 py-2 pr-10 
              border border-gray-300 dark:border-gray-600 
              rounded-lg 
              bg-gray-50 dark:bg-gray-700 
              text-gray-800 dark:text-gray-200
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
            "
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Notifications and profile icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.5 17h5l-5 5v-5zM6 17h5l-5 5v-5z" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src={user?.avatar || 'https://via.placeholder.com/40?text=U'}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium hidden md:block">
            {user?.name || 'المشرف'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;