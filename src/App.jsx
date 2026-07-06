// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Shop from './Shop';
import AdminDashboard from './AdminDashboard';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import { CartProvider, useCart } from './context/CartContext';
import { authAPI } from './services/api';

// ==========================================
// Backend connection test component
// ==========================================
const ConnectionTest = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('Click the button to test connection');
  const [responseData, setResponseData] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  // Auto-test on page load
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    console.log('🔄 Testing connection...');
    setStatus('loading');
    setMessage('Connecting to server...');
    setResponseData(null);
    setErrorDetails(null);

    try {
      // Attempt connection to backend
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📡 Response Status:', response.status);
      console.log('📡 Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`Server responded with error code: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Data received:', data);

      setStatus('success');
      setMessage('✅ Connection successful! Server is running properly');
      setResponseData(data);
    } catch (error) {
      console.error('❌ Error details:', error);
      console.error('❌ Error type:', error.name);
      console.error('❌ Error message:', error.message);

      setStatus('error');
      setMessage('❌ Connection to server failed');

      // Determine the cause of the error
      let reason = 'Unknown cause';
      let solution = '';

      if (error.message === 'Failed to fetch') {
        reason = 'Server is not reachable';
        solution = 'Ensure the server is running on port 5000';
      } else if (error.message.includes('CORS')) {
        reason = 'CORS configuration issue';
        solution = 'Check CORS settings in server.js';
      } else if (error.message.includes('404')) {
        reason = '/api/health endpoint not found';
        solution = 'Ensure the route exists in server.js';
      } else if (error.message.includes('500')) {
        reason = 'Server internal error';
        solution = 'Check backend terminal for errors';
      }

      setErrorDetails({
        message: error.message,
        reason,
        solution,
      });
    }
  };

  // ==========================================
  // Color styles by status
  // ==========================================
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', icon: '✅' };
      case 'error':
        return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: '❌' };
      case 'loading':
        return { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', icon: '🔄' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', icon: '⏸️' };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔌 Backend Connection Test
          </h1>
          <p className="text-gray-600">
            Ensure the server is running on port 5000
          </p>
        </div>

        {/* Status card */}
        <div className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-8 shadow-lg mb-6`}>
          <div className="text-center">
            <div className="text-6xl mb-4">
              {status === 'loading' ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                styles.icon
              )}
            </div>
            <h2 className={`text-2xl font-bold ${styles.text} mb-2`}>
              {message}
            </h2>
          </div>

          {/* Data display on success */}
          {status === 'success' && responseData && (
            <div className="mt-6 bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-gray-700 mb-2">📦 Received data:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto" dir="ltr">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}

          {/* Error details display */}
          {status === 'error' && errorDetails && (
            <div className="mt-6 space-y-3">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-700 mb-2">🔍 Error message:</h3>
                <p className="text-gray-700 font-mono text-sm" dir="ltr">
                  {errorDetails.message}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-700 mb-2">⚠️ Possible cause:</h3>
                <p className="text-gray-700">{errorDetails.reason}</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-300">
                <h3 className="font-bold text-yellow-800 mb-2">💡 Suggested solution:</h3>
                <p className="text-gray-700">{errorDetails.solution}</p>
              </div>
            </div>
          )}
        </div>

        {/* Retry button */}
        <div className="text-center mb-6">
          <button
            onClick={testConnection}
            disabled={status === 'loading'}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
          >
            {status === 'loading' ? '⏳ Testing...' : '🔄 Retry'}
          </button>
        </div>

        {/* Diagnostic info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📋 Diagnostic info
          </h3>
          <div className="space-y-3">
            <DiagnosticItem
              label="Server address"
              value="http://localhost:5000"
              valueDir="ltr"
            />
            <DiagnosticItem
              label="Tested path"
              value="/api/health"
              valueDir="ltr"
            />
            <DiagnosticItem
              label="Frontend address"
              value="http://localhost:3000"
              valueDir="ltr"
            />
            <DiagnosticItem
              label="Connection status"
              value={
                status === 'success' ? '🟢 Connected' :
                status === 'error' ? '🔴 Not connected' :
                status === 'loading' ? '🟡 Testing' : '⚪ Idle'
              }
            />
          </div>
        </div>

        {/* Manual troubleshooting steps */}
        {status === 'error' && (
          <div className="mt-6 bg-blue-50 border border-blue-300 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              🛠️ Troubleshooting steps:
            </h3>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Ensure the backend terminal is open and shows "Server running"</li>
              <li>
                Open the URL directly in your browser:
                <a
                  href="http://localhost:5000/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mx-2 font-mono"
                  dir="ltr"
                >
                  http://localhost:5000/api/health
                </a>
              </li>
              <li>Check the browser Console (F12) for precise errors</li>
              <li>Ensure the backend is running: <code className="bg-gray-200 px-2 py-1 rounded">node server.js</code></li>
              <li>Ensure Windows Firewall is not blocking port 5000</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

  // ==========================================
  // Sub-component for diagnostic item
  // ==========================================
const DiagnosticItem = ({ label, value, valueDir = 'rtl' }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span
      className="text-gray-800 font-mono bg-gray-100 px-3 py-1 rounded"
      dir={valueDir}
    >
      {value}
    </span>
  </div>
);

  // ==========================================
  // Navigation bar (with Glassmorphism)
  // ==========================================
const Navigation = ({ currentView, setCurrentView, user, onLogout }) => {
  const { cartCount, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', color: 'blue' },
    { id: 'shop', label: 'المتجر', color: 'blue' },
    { id: 'admin', label: 'لوحة المشرف', color: 'blue' },
    { id: 'test', label: '🔌 اختبار الاتصال', color: 'green' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass shadow-lg p-4 flex justify-between items-center sticky top-0 z-50"
    >
      <div className="flex justify-center space-x-4 space-x-reverse flex-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setCurrentView(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              currentView === item.id
                ? item.color === 'green'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg animate-pulse-glow'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg animate-pulse-glow'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* زر السلة */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl ml-4"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* زر تسجيل الدخول/الخروج */}
      {user ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-shadow font-medium"
        >
          خروج
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('login')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-shadow font-medium"
        >
          دخول
        </motion.button>
      )}
    </motion.nav>
  );
};

  // ==========================================
  // Main component
  // ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('test'); // Start with test page
  const [user, setUser] = useState(null);

  // Check login status on load
  useEffect(() => {
    const savedUser = authAPI.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Login handler
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  // Logout handler
  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setCurrentView('dashboard');
  };

  // ==========================================
  // Render the appropriate view
  // ==========================================
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'shop':
        return <Shop />;
      case 'admin':
        return <AdminDashboard />;
      case 'test':
        return <ConnectionTest />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <CartProvider>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" dir="rtl">
        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
          onLogout={handleLogout}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </CartProvider>
  );
};

export default App;