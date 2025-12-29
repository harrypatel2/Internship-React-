import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { getSingleProduct } from '../services/productServices';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSingleProduct(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-xl text-red-600 font-semibold bg-red-100 px-6 py-4 rounded-lg shadow">
                Error loading product details. Please try again later.
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-xl text-gray-600 font-semibold">Product not found.</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 text-gray-600 hover:text-blue-600 flex items-center transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Products
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
                    <div className="md:w-1/2 bg-gray-100 relative group">
                        {product.img ? (
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                style={{ maxHeight: '600px' }}
                            />
                        ) : (
                            <div className="w-full h-96 flex items-center justify-center text-gray-400">
                                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-bold text-blue-600 mb-8 bg-blue-50 w-fit px-4 py-2 rounded-lg">
                            {product.price}
                        </div>

                        <p className="text-lg text-gray-600 mb-10 leading-relaxed border-l-4 border-blue-200 pl-4">
                            {product.desc}
                        </p>

                        <div className="mt-auto flex gap-4">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    toast.success(`${product.name} added to cart!`);
                                }}
                                className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Add into Cart
                            </button>
                            <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 active:translate-y-0">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
