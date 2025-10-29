<<<<<<< HEAD
// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

=======
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
const { isAuthenticated, isLoading, user } = useSelector((s) => s.auth);
if (isLoading) {
return (
<div className="min-h-[50vh] grid place-items-center">
<div className="h-8 w-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
</div>
);
}
if (!isAuthenticated) return <Navigate to="/login" replace />;
if (adminOnly && user?.role !== "admin") return <Navigate to="/" replace />;
return children;
};
>>>>>>> 6428b2e (Updated UI and fixed bugs)
export default ProtectedRoute;