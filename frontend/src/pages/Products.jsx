import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productServices';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Sunglasses', 'Eyeglasses', 'Reading', 'Accessories'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-gray-900 text-white h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000"
            alt="Collection Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">The Collection</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
            Discover frames that redefine your perspective. Designed for clarity, crafted for style.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[70px] z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px]">
            <div className="flex space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? 'bg-black text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Showing {products.length} results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-80 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400 font-light">No products found.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                {/* Image Container with Hover Effect */}
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">No Image</div>
                  )}

                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>

                  {/* Quick View Button */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors">
                      Quick View
                    </button>
                  </div>

                  {/* New Badge (Conditional - for demo we show on even IDs) */}
                  {Math.random() > 0.5 && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      New
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.desc}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-20 mt-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Sign up for our newsletter to get the latest updates on new collections and exclusive offers.</p>
          <div className="flex justify-center max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-l-lg border-y border-l border-gray-300 focus:outline-none focus:border-black" />
            <button className="bg-black text-white px-8 py-3 rounded-r-lg font-bold hover:bg-gray-800 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;   