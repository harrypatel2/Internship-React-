import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // In a real app, you might also check for token expiration or specific roles (e.g., admin)
    // const user = JSON.parse(localStorage.getItem('user'));
    // const isAdmin = user && user.role === 'admin';

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Attempt to parse user to check if they are admin, if you want strictly admin access
    // if (!isAdmin) {
    //    return <Navigate to="/home" replace />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;
