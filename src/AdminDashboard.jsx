import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI, orderAPI } from './services/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Shoes',
    subCategory: '',
    imageFile: null
  });

  // Fetch data on page load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch data from backend in parallel
        const [statsData, ordersData, productsData] = await Promise.all([
          productAPI.getStats(),
          orderAPI.getAll(),
          productAPI.getAll(),
        ]);

        setStats(statsData);
        setOrders(ordersData);
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ==========================================
  // Delete product
  // ==========================================
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await productAPI.delete(productId);
       alert('Product deleted successfully');
       // Reload products and stats
      const [newProducts, newStats] = await Promise.all([
        productAPI.getAll(),
        productAPI.getStats(),
      ]);
      setProducts(newProducts);
      setStats(newStats);
    } catch (err) {
       alert('Failed to delete product: ' + err.message);
    }
  };

  // ==========================================
  // Open modal for add or edit
  // ==========================================
  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory || '',
        imageFile: null
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'Shoes',
        subCategory: '',
        imageFile: null
      });
    }
    setIsModalOpen(true);
  };

  // ==========================================
  // Close modal
  // ==========================================
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: 'Shoes',
      subCategory: '',
      imageFile: null
    });
  };

  // ==========================================
  // Save product (add or edit)
  // ==========================================
  const handleSaveProduct = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('price', String(formData.price));
      form.append('description', formData.description);
      form.append('category', formData.category);
      if (formData.subCategory) form.append('subCategory', formData.subCategory);
      if (formData.imageFile) form.append('image', formData.imageFile);

      if (editingProduct) {
        await productAPI.update(editingProduct.id, form);
        alert('Product updated successfully');
      } else {
        await productAPI.create(form);
        alert('Product added successfully');
      }

      const [newProducts, newStats] = await Promise.all([
        productAPI.getAll(),
        productAPI.getStats(),
      ]);
      setProducts(newProducts);
      setStats(newStats);
      closeModal();
    } catch (err) {
       alert('Failed to save product: ' + err.message);
    }
  };

  // ==========================================
  // Update order status
  // ==========================================
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);

      // Status updated locally
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      ));

       alert('Order status updated successfully');
    } catch (err) {
       alert('Failed to update order: ' + err.message);
    }
  };

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
        <span className="mr-4 text-gray-600 text-lg font-medium">جاري تحميل البيانات...</span>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
      >
        🎛️ لوحة المشرف
      </motion.h1>
      
      {/* Stats */}
      {stats && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg mb-2">📦 إجمالي المنتجات</h3>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold"
            >
              {stats.total}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg mb-2">👟 أحذية</h3>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold"
            >
              {stats.Shoes}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg mb-2">🧸 ألعاب أطفال</h3>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold"
            >
              {stats.Toys}
            </motion.p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg mb-2">🛒 إجمالي الطلبات</h3>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold"
            >
              {orders.length}
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Products table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📦 إدارة المنتجات</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow font-medium"
          >
            + إضافة منتج جديد
          </motion.button>
        </div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📭
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-500">ابدأ بإضافة منتجات جديدة</p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-right text-gray-600 font-bold">المنتج</th>
                  <th className="py-3 text-right text-gray-600 font-bold">الفئة</th>
                  <th className="py-3 text-right text-gray-600 font-bold">السعر</th>
                  <th className="py-3 text-center text-gray-600 font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-white/50 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                          src={product.imageUrl ? `${API_BASE_URL}${product.imageUrl}` : 'https://via.placeholder.com/100'}
                          className="w-12 h-12 rounded-xl object-cover shadow-md"
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100';
                          }}
                        />
                        <span className="font-bold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-blue-600">${product.price}</td>
                    <td className="py-4 text-center space-x-2 rtl:space-x-reverse">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal(product)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-xl transition-colors"
                        title="تعديل"
                      >
                        ✏️
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                        title="حذف"
                      >
                        🗑️
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Orders table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-2xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 الطلبات الأخيرة</h2>
        
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📭
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد طلبات</h3>
            <p className="text-gray-500">سيظهر الطلبات هنا عند استلامها</p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-right text-gray-600 font-bold">رقم الطلب</th>
                  <th className="py-3 text-right text-gray-600 font-bold">المبلغ</th>
                  <th className="py-3 text-right text-gray-600 font-bold">الحالة</th>
                  <th className="py-3 text-right text-gray-600 font-bold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-white/50 transition-colors"
                  >
                    <td className="py-4 font-bold text-gray-800">#{order.id}</td>
                    <td className="py-4 font-bold text-blue-600">${order.totalAmount}</td>
                    <td className="py-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          order.status === 'completed' 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                            : order.status === 'pending' 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                            : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                        }`}
                      >
                        {order.status === 'completed' ? '✅ مكتمل' :
                         order.status === 'pending' ? '⏳ قيد الانتظار' : '❌ ملغي'}
                      </motion.span>
                    </td>
                    <td className="py-4">
                      <motion.select
                        whileFocus={{ scale: 1.05 }}
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="border-2 border-blue-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none bg-white/50 cursor-pointer"
                      >
                        <option value="pending">⏳ قيد الانتظار</option>
                        <option value="completed">✅ مكتمل</option>
                        <option value="cancelled">❌ ملغي</option>
                      </motion.select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal (add/edit window) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {editingProduct ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">اسم المنتج</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">السعر</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50 h-24 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">الفئة</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50 cursor-pointer"
                    required
                  >
                    <option value="Shoes">👟 أحذية</option>
                    <option value="Toys">🧸 ألعاب أطفال</option>
                    <option value="Perfumes">🌸 عطور</option>
                    <option value="Accessories">💎 إكسسوارات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">الفئة الفرعية (اختياري)</label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">صورة المنتج</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50"
                    required={!editingProduct}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-shadow font-medium"
                  >
                    {editingProduct ? '💾 حفظ التعديلات' : '➕ إضافة المنتج'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    إلغاء
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;