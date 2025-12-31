import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderServices';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Retrieve auth token - assuming it's stored in localStorage as 'token' 
    // or you might want to get it from an AuthContext if available
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'cod' // default to Cash on Delivery
    });

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Remove any non-numeric characters except decimal point
            const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handleSubmitOrder = async () => {
        setLoading(true);

        if (!token) {
            toast.error('Please login to place an order');
            navigate('/login');
            setLoading(false);
            return;
        }

        // Prepare common order data
        const orderItemsData = cartItems.map(item => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price.toString().replace(/[^0-9.]/g, '')),
            image: item.img
        }));

        const shippingAddressData = {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
        };

        const totalOrderPrice = calculateTotal();

        if (formData.paymentMethod === 'cod') {
            // Existing COD Logic
            try {
                const orderData = {
                    orderItems: orderItemsData,
                    shippingAddress: shippingAddressData,
                    paymentMethod: formData.paymentMethod,
                    totalPrice: totalOrderPrice,
                    paymentResult: {
                        id: `COD-${Date.now()}`,
                        status: 'pending',
                        update_time: new Date().toISOString(),
                        email_address: formData.email
                    }
                };

                await createOrder(orderData, token);
                clearCart();
                navigate('/order-success');
                toast.success('Order placed successfully!');
            } catch (error) {
                console.error('Order error:', error);
                console.error('Order error:', error);
                const errorMessage = error.response?.data?.message
                    || error.message
                    || (error.response && error.response.data) // Fallback if data is string
                    || 'Failed to place order';

                const finalError = error.message ? error.message : (error.message || error);
                const errorMsg = typeof finalError === 'string' ? finalError : 'Failed to place order';
                toast.error(errorMsg);
                // Fallback alert to ensure user sees the error
                // alert(`Order Failed: ${errorMsg}`);
            } finally {
                setLoading(false);
            }
        } else if (formData.paymentMethod === 'razorpay') {
            // Razorpay Logic
            const res = await loadRazorpay();

            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                setLoading(false);
                return;
            }

            try {
                // 1. Create Order on Backend
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: order } = await axios.post('http://localhost:5001/api/payment/create-order', {
                    amount: totalOrderPrice
                }, config);

                // 2. Initialize Razorpay
                const options = {
                    key: "rzp_test_RwZ8MWEM2Bc67U", // Enter the Key ID generated from the Dashboard
                    amount: order.amount,
                    currency: order.currency,
                    name: "EyePPA",
                    description: "Eyewear Transaction",
                    image: "https://example.com/your_logo", // You can add a logo here
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            // 3. Verify Payment and Place Order (Save to DB)
                            // Ideally, you verify signature on backend. For now, saving order on success.

                            const orderData = {
                                orderItems: orderItemsData,
                                shippingAddress: shippingAddressData,
                                paymentMethod: 'Razorpay',
                                totalPrice: totalOrderPrice,
                                paymentResult: {
                                    id: response.razorpay_payment_id,
                                    status: 'paid',
                                    update_time: new Date().toISOString(),
                                    email_address: formData.email,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature
                                }
                            };

                            await createOrder(orderData, token);
                            clearCart();
                            navigate('/order-success');
                            toast.success('Payment Successful! Order Placed.');
                        } catch (error) {
                            console.error('Order Save error:', error);
                            // Extract detailed error message
                            const finalError = error.message ? error.message : (error.message || error);
                            const errorMsg = typeof finalError === 'string' ? finalError : 'Order Save Failed';

                            toast.error(`Error: ${errorMsg}`);
                            // alert(`Order Save Error: ${errorMsg}`); // Fallback
                        }
                    },
                    prefill: {
                        name: formData.fullName,
                        email: formData.email,
                        contact: "9999999999" // Can add phone field to form
                    },
                    notes: {
                        address: formData.address
                    },
                    theme: {
                        color: "#2563EB"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                setLoading(false); // Modal opened, stop loading spinner on button

            } catch (error) {
                console.error("Payment Error:", error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong with payment initialization.";
                toast.error(errorMessage);
                setLoading(false);
            }
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold transition-colors`}>1</div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold transition-colors`}>2</div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold transition-colors`}>3</div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
                        <span>Shipping</span>
                        <span>Payment</span>
                        <span>Review</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
                    {step === 1 && (
                        <form onSubmit={handleNextStep}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-3"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleNextStep}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        id="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleInputChange}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700 flex-1">
                                        Cash on Delivery (COD)
                                    </label>
                                </div>
                                {/* Placeholder for other payment methods */}
                                <div className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        id="razorpay"
                                        name="paymentMethod"
                                        type="radio"
                                        value="razorpay"
                                        checked={formData.paymentMethod === 'razorpay'}
                                        onChange={handleInputChange}
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <label htmlFor="razorpay" className="ml-3 block text-sm font-medium text-gray-700 flex-1">
                                        Online Payment (Razorpay)
                                    </label>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="text-gray-600 font-medium hover:text-gray-900 px-6 py-3"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Review Order
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Order</h2>

                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Details</h3>
                                <p className="text-gray-600">{formData.fullName}</p>
                                <p className="text-gray-600">{formData.address}</p>
                                <p className="text-gray-600">{formData.city}, {formData.postalCode}</p>
                                <p className="text-gray-600">{formData.country}</p>
                                <p className="text-gray-600 mt-2">{formData.email}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item._id} className="py-4 flex justify-between">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-gray-900">{item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-blue-600">₹{calculateTotal()}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="text-gray-600 font-medium hover:text-gray-900 px-6 py-3"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
