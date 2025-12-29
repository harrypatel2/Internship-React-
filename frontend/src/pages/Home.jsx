import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useCart } from "../context/CartContext";
import eyeglass1 from "../assets/eyeglass_1.png";
import eyeglass2 from "../assets/eyeglass_2.png";
import eyeglass3 from "../assets/eyeglass_3.png";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import { getAllProducts } from "../services/productServices";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch real products for the trending section, fallback to static if needed
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        // Take first 3-4 products
        if (data && data.length > 0) {
          setFeaturedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  // Fallback static data if API fails or returns empty
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : [
    { _id: 1, name: "Modern Spec", price: "$120", img: eyeglass1, desc: "Stylish and modern frames." },
    { _id: 2, name: "Golden Aviator", price: "$150", img: eyeglass2, desc: "Classic gold aviators." },
    { _id: 3, name: "Reading Round", price: "$90", img: eyeglass3, desc: "Minimalist round glasses." },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-74px)] flex items-center justify-center bg-gray-900 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=2500"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto transform translate-y-[-10%]">
          <h2 className="text-blue-400 font-medium tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
            New Collection 2024
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-up delay-100">
            See the World<br />Differently.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
            Handcrafted eyewear that blends timeless design with modern precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              to="/products"
              className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-transparent"
            >
              Shop Collection
            </Link>
            <Link
              to="/about-us"
              className="px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trending / Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Now</h2>
              <div className="h-1 w-20 bg-blue-600"></div>
              <p className="mt-4 text-gray-600 text-lg">Our most popular frames, curated just for you.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors mt-6 md:mt-0 group">
              View All Products
              <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {displayProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group cursor-pointer"
              >
                <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={product.img || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800"}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                        console.log(`Added ${product.name} to cart`);
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      title="Add to Cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                    <button
                      className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      title="Quick View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-1">{product.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial 'The Look' Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 rounded-3xl overflow-hidden bg-white shadow-xl">
            <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1500"
                alt="Eyewear Display"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
              <div className="absolute bottom-8 left-8 text-white lg:hidden">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">Limited Edition</p>
                <h3 className="text-3xl font-bold">The Summer Edit</h3>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm hidden lg:block">Limited Edition</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">The Summer Edit</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Embrace the sun with our exclusive summer collection. Featuring polarized lenses and lightweight acetate frames designed for long days at the beach and sunsets in the city.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Premium Polarized Lenses
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Italian Acetate Frames
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  100% UV Protection
                </li>
              </ul>

              <Link
                to="/products"
                className="inline-block bg-blue-600 text-white px-10 py-4 font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 text-center w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Integration */}
      <div className="border-t border-gray-100">
        <WhyChooseUs />
      </div>

      {/* FAQ Integration */}
      <div className="bg-blue-50/50">
        <FAQ />
      </div>

      {/* Newsletter Cta */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Community</h2>
          <p className="text-blue-100 text-xl mb-10">Sign up for exclusive access to new drops, special offers, and style tips.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
