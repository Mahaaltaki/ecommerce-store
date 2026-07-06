import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productAPI } from './services/api';
import { useCart } from './context/CartContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Shop = () => {
  const { addToCart } = useCart();
  
  // ==========================================
  // State Management
  // ==========================================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ==========================================
  // Fetch products from backend
  // ==========================================
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend API call
      const data = await productAPI.getAll({
        category: selectedCategory,
        search: searchQuery,
      });
      
      setProducts(data);
    } catch (err) {
      setError('فشل في تحميل المنتجات: ' + err.message);
      console.error('خطأ:', err);
      // On error, use local fallback data
      const productsData = (await import('./productsData')).default;
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Render
  // ==========================================
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-64"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
        <span className="mr-4 text-gray-600 text-lg font-medium">جاري تحميل المنتجات...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass bg-red-50/80 border border-red-200 text-red-700 px-6 py-4 rounded-2xl m-4" dir="rtl"
      >
        <p className="font-bold text-xl mb-2">❌ حدث خطأ!</p>
        <p className="mb-4">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchProducts}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow"
        >
          إعادة المحاولة
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      {/* ==========================================
          Search and filter bar (with Glassmorphism)
          ========================================== */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-2xl p-6 mb-8 shadow-lg"
      >
        <div className="flex flex-wrap gap-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="🔍 ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] px-6 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none bg-white/50"
          />
          
          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none bg-white/50 cursor-pointer"
          >
            <option value="">📦 جميع الفئات</option>
            <option value="Shoes">👟 أحذية</option>
            <option value="Toys">🧸 ألعاب أطفال</option>
            <option value="Perfumes">🌸 عطور</option>
            <option value="Accessories">💎 إكسسوارات</option>
          </motion.select>
        </div>
      </motion.div>

      {/* ==========================================
          Product grid (with Animations)
          ========================================== */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={product.imageUrl ? `${API_BASE_URL}${product.imageUrl}` : 'https://via.placeholder.com/500?text=No+Image'}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500?text=No+Image';
                }}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                {product.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    className={`text-xl ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-xl hover:shadow-lg transition-shadow font-medium"
                >
                  🛒 أضف للسلة
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ==========================================
          Empty state
          ========================================== */}
      {products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            �
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد منتجات مطابقة</h3>
          <p className="text-gray-500 mb-4">جرب تغيير معايير البحث أو الفلترة</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-shadow"
          >
            مسح الفلاتر
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;