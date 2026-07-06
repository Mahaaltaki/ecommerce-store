import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ProductsStats from './ProductsStats';
import OrdersTable from './OrdersTable';
import SalesChart from './SalesChart';

const Dashboard = () => {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active sidebar item
  const [activeItem, setActiveItem] = useState('dashboard');

  // User data
  const user = {
    name: 'محمد أحمد',
    avatar: 'https://via.placeholder.com/40?text=محمد'
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Change active sidebar item
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isDarkMode={isDarkMode}
        onDarkModeToggle={toggleDarkMode}
      />

      {/* Top navigation bar */}
      <Navbar
        user={user}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={toggleSidebar}
      />

      {/* Main content */}
      <main className="pt-20 px-4 md:px-8 mr-64 ltr:ml-64 ltr:mr-0">
        <div className="max-w-7xl mx-auto">
          {/* Product stats cards */}
          <ProductsStats />

          {/* Charts */}
          <div className="mb-8">
            <SalesChart />
          </div>

          {/* Orders table */}
          <OrdersTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;