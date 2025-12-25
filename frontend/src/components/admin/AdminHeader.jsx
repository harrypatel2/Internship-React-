import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { path: '/admin/products', label: 'Products', icon: '📦' },
    ];

    return (
        <header className="bg-gray-900 text-white h-16 flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-wider leading-none">VISION<span className="text-blue-500">.</span></h1>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Admin Panel</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === item.path
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right Side: Profile & Logout */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 border-r border-gray-700 pr-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                        A
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs text-gray-500 leading-none mt-1">admin@vision.com</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
