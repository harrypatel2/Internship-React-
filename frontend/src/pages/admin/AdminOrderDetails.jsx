import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails, deliverOrder } from '../../services/adminOrderService';
import toast from 'react-hot-toast';

const AdminOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await getOrderDetails(id, token);
                setOrder(data);
            }
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handleDeliverHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await deliverOrder(order._id, userInfo.token);
            toast.success('Order delivered!');
            fetchOrder();
        } catch (error) {
            toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    return loading ? (
        <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
    ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>
    ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order {order._id}</h2>
                <Link to="/admin/orders" className="text-indigo-600 hover:text-indigo-800 font-medium">Back to Orders</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Shipping</h3>
                    <p className="mb-2"><strong className="text-gray-600">Name:</strong> {order.user?.name}</p>
                    <p className="mb-2"><strong className="text-gray-600">Email:</strong> {order.user?.email}</p>
                    <p className="mb-4">
                        <strong className="text-gray-600">Address:</strong><br />
                        {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.postalCode}, {' '}
                        {order.shippingAddress.country}
                    </p>

                    <div className={`p-4 rounded-md mb-6 ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Payment</h3>
                    <p className="mb-2"><strong className="text-gray-600">Method:</strong> {order.paymentMethod}</p>
                    <div className={`p-4 rounded-md mb-6 ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Order Items</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                            {order.orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16">
                                                <img className="h-16 w-16 rounded object-cover" src={item.image} alt={item.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-end">
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">Total: ₹{order.totalPrice}</p>
                </div>
            </div>

            {/* Order Action Buttons */}
            {!order.isDelivered && (
                <div className="mt-8 border-t pt-6">
                    <button
                        onClick={handleDeliverHandler}
                        className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Mark As Delivered
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminOrderDetails;
