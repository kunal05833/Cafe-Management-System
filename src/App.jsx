<<<<<<< HEAD
// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from './features/auth/authSlice';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Customer Components
import Menu from './components/customer/Menu';
import Cart from './components/customer/Cart';
import OrderTracking from './components/customer/OrderTracking';
import UdhariPage from './components/customer/UdhariPage';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageMenu from './components/admin/ManageMenu';
import ManageOrders from './components/admin/ManageOrders';
import UdhariManagement from './components/admin/UdhariManagement';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            ...userDoc.data()
          }));
        }
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />

          {/* Customer Protected Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          } />
          <Route path="/udhari" element={
            <ProtectedRoute>
              <UdhariPage />
            </ProtectedRoute>
          } />

          {/* Admin Protected Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/menu" element={
            <ProtectedRoute adminOnly>
              <ManageMenu />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly>
              <ManageOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/udhari" element={
            <ProtectedRoute adminOnly>
              <UdhariManagement />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
=======
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./services/firebase/config";
import { setUser } from "./features/auth/authSlice";
import { Toaster } from "sonner";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// Customer Pages
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Udhari from "./pages/customer/Udhari";
import Profile from "./pages/customer/Profile";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageOrders from "./pages/admin/ManageOrders";
import UdhariManagement from "./pages/admin/UdhariManagement";
import Customers from "./pages/admin/Customers";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Common
import NotFound from "./pages/common/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicOnlyRoute from "./components/common/PublicOnlyRoute";

function App() {
const dispatch = useDispatch();
const [boot, setBoot] = useState(true);

useEffect(() => {
const unsub = onAuthStateChanged(auth, async (fbUser) => {
try {
if (fbUser) {
const snap = await getDoc(doc(db, "users", fbUser.uid));
const profile = snap.exists() ? snap.data() : {};
dispatch(setUser({ uid: fbUser.uid, email: fbUser.email, ...profile }));
} else {
dispatch(setUser(null));
}
} catch (err) {
console.error("Auth bootstrap error:", err);
dispatch(setUser(null));
} finally {
setBoot(false);
}
});
return () => unsub();
}, [dispatch]);

if (boot) {
return (
<div className="min-h-screen grid place-items-center">
<div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
</div>
);
}

return (
<Router>
<Routes>
{/* Customer */}
<Route path="/" element={<CustomerLayout />}>
<Route index element={<Home />} />
<Route path="menu" element={<Menu />} />
<Route path="customer/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
<Route path="customer/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
<Route path="customer/udhari" element={<ProtectedRoute><Udhari /></ProtectedRoute>} />
<Route path="customer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
</Route>
    {/* Auth */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
    </Route>

    {/* Admin */}
    <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="menu" element={<ManageMenu />} />
      <Route path="orders" element={<ManageOrders />} />
      <Route path="udhari" element={<UdhariManagement />} />
      <Route path="customers" element={<Customers />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <Toaster richColors position="top-right" />
</Router>
);
>>>>>>> 6428b2e (Updated UI and fixed bugs)
}

export default App;