import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
const { isAuthenticated, isLoading } = useSelector((s) => s.auth);
if (isLoading) {
return (
<div className="min-h-[50vh] grid place-items-center">
<div className="h-8 w-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
</div>
);
}
if (isAuthenticated) return <Navigate to="/" replace />;
return children;
};
export default PublicOnlyRoute;