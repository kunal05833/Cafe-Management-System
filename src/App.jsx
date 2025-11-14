import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // ✅ Make sure AuthContext is a named export

// ==================== LAYOUTS ====================
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

// ==================== AUTH PAGES ====================
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// ==================== CUSTOMER PAGES ====================
import Home from './pages/customer/Home';
import Menu from './pages/customer/Menu';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import OrderDetail from './pages/customer/OrderDetail';
import OrderTracking from './pages/customer/OrderTracking';
import Profile from './pages/customer/Profile';
import Notifications from './pages/customer/Notifications';
import Rewards from './pages/customer/Rewards';
import Reviews from './pages/customer/Reviews';
import TableReservation from './pages/customer/TableReservation';
import Udhari from './pages/customer/Udhari';

// ==================== ADMIN PAGES ====================
import Dashboard from './pages/admin/Dashboard';
import ManageMenu from './pages/admin/ManageMenu';
import ManageOrders from './pages/admin/ManageOrders';
import Customers from './pages/admin/Customers';
import Reports from './pages/admin/Reports';
import UdhariManagement from './pages/admin/UdhariManagement';
import Settings from './pages/admin/Settings';

// ==================== COMMON PAGES ====================
import NotFound from './pages/common/NotFound';
import ErrorPage from './pages/common/ErrorPage';

// ==================== LOADING COMPONENT ====================
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}

// ==================== PROTECTED ROUTE - ADMIN ====================
function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ==================== PROTECTED ROUTE - CUSTOMER ====================
function CustomerRoute({ children }) {
  const { user, isCustomer, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isCustomer()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

// ==================== PUBLIC ROUTE ====================
function PublicRoute({ children }) {
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    if (isAdmin()) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

// ==================== MAIN APP COMPONENT ====================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Admin Dashboard - Default */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          {/* Admin Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Manage Menu */}
          <Route path="menu" element={<ManageMenu />} />

          {/* Manage Orders */}
          <Route path="orders" element={<ManageOrders />} />

          {/* Customers Management */}
          <Route path="customers" element={<Customers />} />

          {/* Reports & Analytics */}
          <Route path="reports" element={<Reports />} />

          {/* Udhari Management */}
          <Route path="udhari" element={<UdhariManagement />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ==================== CUSTOMER ROUTES ==================== */}
        <Route
          element={
            <CustomerRoute>
              <CustomerLayout />
            </CustomerRoute>
          }
        >
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Menu */}
          <Route path="/menu" element={<Menu />} />

          {/* Shopping Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />

          {/* Order Detail */}
          <Route path="/orders/:id" element={<OrderDetail />} />

          {/* Order Tracking */}
          <Route path="/track/:id" element={<OrderTracking />} />

          {/* User Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Notifications */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Rewards & Loyalty */}
          <Route path="/rewards" element={<Rewards />} />

          {/* Reviews */}
          <Route path="/reviews" element={<Reviews />} />

          {/* Table Reservation */}
          <Route path="/reservations" element={<TableReservation />} />

          {/* Customer Udhari */}
          <Route path="/udhari" element={<Udhari />} />
        </Route>

        {/* ==================== ERROR ROUTES ==================== */}
        <Route path="/error" element={<ErrorPage />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
