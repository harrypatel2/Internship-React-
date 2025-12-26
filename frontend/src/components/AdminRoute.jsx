import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // We can check user immediately if parsing logic is synchronous or 
    // if we trust localStorage 'user' object structure.
    // Ideally we should sync with backend, but for this task we use localStorage.

    // Re-read strictly for render logic to avoid flash of content or race conditions 
    // if useEffect hasn't run yet (though sync read is better here for auth guards).
    const storedUserSync = JSON.parse(localStorage.getItem('user') || 'null');

    if (!storedUserSync || storedUserSync.role !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
