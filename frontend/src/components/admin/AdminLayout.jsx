import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <AdminHeader />
            <div className="flex-1 flex flex-col">
                <nav className="px-8 py-4 bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto flex space-x-4">
                        <Link to="/admin/products" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentPath.includes('/admin/products') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                            Products
                        </Link>
                        <Link to="/admin/orders" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentPath.includes('/admin/orders') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                            Orders
                        </Link>
                    </div>
                </nav>
                <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
