import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Assuming price is a string like "$120", remove '$' and parse
            const price = parseFloat(item.price.replace('$', ''));
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <div className="bg-blue-50 p-6 rounded-full inline-block mb-6">
                        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any eyewear to your collection yet.</p>
                    <Link
                        to="/products"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <section className="lg:col-span-8">
                        <ul className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <li key={item._id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors">
                                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                <Link to={`/products/${item._id}`} className="hover:text-blue-600">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="text-lg font-bold text-gray-900">{item.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.desc}</p>

                                        <div className="flex-1 flex items-end justify-between mt-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                <button
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                    disabled
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                                                <button
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    removeFromCart(item._id);
                                                    toast.success('Item removed');
                                                }}
                                                className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 group"
                                            >
                                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 text-sm divide-y divide-gray-100">
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">${calculateTotal()}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-green-600">Free</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-xl font-bold text-blue-600">${calculateTotal()}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="button"
                                    className="w-full bg-blue-600 border border-transparent rounded-xl shadow-lg py-4 px-4 text-base font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-1"
                                    onClick={() => toast.success('Checkout functionality coming soon!')}
                                >
                                    Checkout
                                </button>
                                <div className="mt-4 text-center">
                                    <Link to="/products" className="text-sm text-gray-500 hover:text-gray-900 font-medium">
                                        or Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Cart;