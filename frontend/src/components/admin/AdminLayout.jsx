import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <AdminHeader />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
