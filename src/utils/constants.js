export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_TYPES = {
  CASH: 'cash',
  UDHARI: 'udhari',
  ONLINE: 'online'
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  STAFF: 'staff'
};

export const MENU_CATEGORIES = {
  ALL: 'all',
  COFFEE: 'coffee',
  SNACKS: 'snacks',
  DESSERTS: 'desserts',
  BEVERAGES: 'beverages'
};

export const DEFAULT_UDHARI_LIMIT = 5000;

export const TAX_RATE = 0.05; // 5% tax

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  MENU: 'menu',
  ORDERS: 'orders',
  TRANSACTIONS: 'transactions'
};

export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  DISPLAY_WITH_TIME: 'dd MMM yyyy, hh:mm a',
  INPUT: 'yyyy-MM-dd'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};