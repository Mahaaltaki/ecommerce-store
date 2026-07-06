// src/services/api.js

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',  // Must match server credentials: true
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Error connecting to server');
  }

  return response.json();
};


// ==========================================
// Authentication service
// ==========================================
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Log in a user
  login: async (credentials) => {
    console.log('🔐 Sending login request to backend...');
    console.log('📧 Credentials:', credentials);

    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    console.log('✅ Response received from backend:', data);

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('💾 Token saved to localStorage');
    }

    return data;
  },

  // Log out a user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ==========================================
// Products service
// ==========================================
export const productAPI = {
  // Get all products with filtering
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    
    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    return fetchWithAuth(url);
  },

  // Get a single product
  getById: async (id) => {
    return fetchWithAuth(`/products/${id}`);
  },

  // Create a new product (admin only)
  create: async (formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.message || 'Failed to add product');
    }

    return response.json();
  },

  // Update a product (admin only)
  update: async (id, formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.message || 'Failed to update product');
    }

    return response.json();
  },

  // Delete a product (admin only)
  delete: async (id) => {
    return fetchWithAuth(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Get product statistics
  getStats: async () => {
    return fetchWithAuth('/products/stats');
  },

  // Upload a product image
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/products/upload`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to upload image');
    }

    return response.json();
  }
};

// ==========================================
// Orders service
// ==========================================
export const orderAPI = {
  // Create a new order
  create: async (orderData) => {
    return fetchWithAuth('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Get orders for the current user
  getMyOrders: async () => {
    return fetchWithAuth('/orders/my-orders');
  },

  // Get all orders (admin only)
  getAll: async () => {
    return fetchWithAuth('/orders');
  },

  // Update order status
  updateStatus: async (id, status) => {
    return fetchWithAuth(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

export default { authAPI, productAPI, orderAPI };