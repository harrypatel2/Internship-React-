import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <div className="bg-green-50 p-6 rounded-full inline-block mb-6">
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Thank you for your purchase. Your order has been received and is being processed.</p>
                <Link
                    to="/products"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
