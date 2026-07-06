import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      console.log('🔐 Attempting login...');
      console.log('📧 Email:', email);

      // Login API call
      const data = await authAPI.login({ email, password });

      console.log('✅ Login successful!', data);

      // Notify parent component
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" dir="rtl"
    >
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="glass bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          🔐 تسجيل الدخول
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6"
          >
            <p className="font-bold">❌ {error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50 transition-all"
              placeholder="example@email.com"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 font-medium mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50 transition-all"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ جاري تسجيل الدخول...' : '🚀 دخول'}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
        >
          <p className="text-sm text-gray-600 font-medium mb-2">🔑 بيانات المشرف للتجربة:</p>
          <p className="text-sm text-gray-700">البريد: <span className="font-bold">admin@store.com</span></p>
          <p className="text-sm text-gray-700">كلمة المرور: <span className="font-bold">admin123</span></p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
