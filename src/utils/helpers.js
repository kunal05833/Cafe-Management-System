// src/utils/helpers.js
import { format, formatDistanceToNow } from 'date-fns';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, 'PPp');
};

// Format relative time
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

// Calculate order total with tax
export const calculateOrderTotal = (items, taxRate = 0.05) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax
  };
};

// Get order status color
export const getOrderStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};

// Check if user can order on credit
export const canOrderOnCredit = (userBalance, userLimit, orderAmount) => {
  return (userBalance + orderAmount) <= userLimit;
};

// Group orders by date
export const groupOrdersByDate = (orders) => {
  const grouped = {};
  
  orders.forEach(order => {
    const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(order);
  });
  
  return grouped;
};

// Calculate daily revenue
export const calculateDailyRevenue = (orders) => {
  const revenueByDate = {};
  
  orders.forEach(order => {
    const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
    if (!revenueByDate[date]) {
      revenueByDate[date] = 0;
    }
    revenueByDate[date] += order.totalAmount;
  });
  
  return revenueByDate;
};

// Get best selling items
export const getBestSellingItems = (orders, limit = 5) => {
  const itemCounts = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!itemCounts[item.id]) {
        itemCounts[item.id] = {
          ...item,
          totalQuantity: 0,
          revenue: 0
        };
      }
      itemCounts[item.id].totalQuantity += item.quantity;
      itemCounts[item.id].revenue += item.price * item.quantity;
    });
  });
  
  return Object.values(itemCounts)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, limit);
};