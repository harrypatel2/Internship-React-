import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../services/productServices';

const AdminEditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        price: '',
        category: 'Sunglasses',
        img: '',
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getSingleProduct(id);
                setFormData({
                    name: product.name,
                    desc: product.desc,
                    price: product.price,
                    category: product.category,
                    img: product.img
                });
            } catch (err) {
                setError("Failed to load product details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
            setError("You must be logged in as an admin.");
            setUpdating(false);
            return;
        }

        try {
            await updateProduct(id, formData, token);
            navigate('/admin/products');
        } catch (err) {
            setError(err.message || 'Failed to update product');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading product details...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            <option value="Sunglasses">Sunglasses</option>
                            <option value="Eyeglasses">Eyeglasses</option>
                            <option value="Reading">Reading</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            name="img"
                            required
                            value={formData.img}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        {formData.img && (
                            <div className="mt-4 p-2 border border-gray-200 rounded-lg w-fit">
                                <img src={formData.img} alt="Preview" className="h-24 w-auto object-cover rounded" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="desc"
                            required
                            rows="4"
                            value={formData.desc}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updating}
                            className={`px-6 py-2.5 rounded-lg font-medium text-white shadow-lg shadow-blue-500/30 transition-all ${updating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/50'
                                }`}
                        >
                            {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProduct;
