import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useStore = create((set, get) => ({
  // State
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  products: [],
  filteredProducts: [],
  cart: [],
  cartCount: 0,
  cartTotal: 0,
  wishlist: [],
  orders: [],
  isLoading: false,
  isCartOpen: false,
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',

  // Auth
  login: async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true });
      toast.success('Welcome back!', { style: { background: '#27272a', color: '#fafafa' } });
      get().fetchCart();
      get().fetchWishlist();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true });
      toast.success('Account created!', { style: { background: '#27272a', color: '#fafafa' } });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false, cart: [], wishlist: [], orders: [] });
    toast.success('Logged out');
  },

  // Products
  fetchProducts: async () => {
    const { data } = await axios.get(`${API_URL}/products`);
    set({ products: data, filteredProducts: data });
    get().applyFilters();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, selectedCategory, searchQuery, sortBy } = get();
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));

    set({ filteredProducts: filtered });
  },

  // Cart
  fetchCart: async () => {
    try {
      const { data } = await api.get('/cart');
      const { products } = get();
      const cartWithProducts = data.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
      }));
      const total = cartWithProducts.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
      set({ cart: cartWithProducts, cartCount: cartWithProducts.reduce((sum, item) => sum + item.quantity, 0), cartTotal: total });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  },

  addToCart: async (productId, quantity = 1, selectedColor, selectedSize) => {
    if (!get().isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await api.post('/cart', { productId, quantity, selectedColor, selectedSize });
      await get().fetchCart();
      toast.success('Added to cart!', { icon: '🛒', style: { background: '#27272a', color: '#fafafa' } });
      set({ isCartOpen: true });
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  },

  updateCartItem: async (itemId, quantity) => {
    await api.put(`/cart/${itemId}`, { quantity });
    await get().fetchCart();
  },

  removeFromCart: async (itemId) => {
    await api.delete(`/cart/${itemId}`);
    await get().fetchCart();
    toast.success('Removed from cart');
  },

  // Wishlist
  fetchWishlist: async () => {
    const { data } = await api.get('/wishlist');
    set({ wishlist: data });
  },

  toggleWishlist: async (productId) => {
    if (!get().isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    const { wishlist } = get();
    const isInWishlist = wishlist.includes(productId);
    if (isInWishlist) {
      await api.delete(`/wishlist/${productId}`);
      toast.success('Removed from wishlist');
    } else {
      await api.post('/wishlist', { productId });
      toast.success('Added to wishlist!', { icon: '❤️', style: { background: '#27272a', color: '#fafafa' } });
    }
    await get().fetchWishlist();
  },

  // Orders
  fetchOrders: async () => {
    const { data } = await api.get('/orders');
    set({ orders: data });
  },

  createOrder: async (orderData) => {
    const { data } = await api.post('/orders', orderData);
    await get().fetchOrders();
    toast.success('Order placed successfully!', { icon: '🎉', duration: 4000, style: { background: '#27272a', color: '#fafafa' } });
    return data;
  },

  // UI
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
}));

export default useStore;