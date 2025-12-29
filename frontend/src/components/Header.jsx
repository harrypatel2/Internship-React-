import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { getCartCount } = useCart();

  // ... (rest of useEffects) ...

  // AFTER useEffects and before return, I need to keep the file valid. 
  // Actually I'll use a larger block to be safe or multiple replacements.
  // Let's just do the imports and top level first.


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    }
    setShowDropdown(false);
  }, [pathname]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const navItem = (to, label) => (
    <Link
      to={to}
      className="nav-link"
      style={{
        background: pathname === to ? "#e2e8f0" : "transparent",
        color: pathname === to ? "#0f172a" : undefined,
      }}
    >
      {label}
    </Link>
  );

  return (
    <div className="header">
      <div className="logo">
        <Link to="/home">VISION.</Link>
      </div>

      <div className="nav-links">
        {navItem("/home", "Home")}
        {navItem("/products", "Products")}
        {navItem("/about-us", "About")}
        {navItem("/contact-us", "Contact")}

        <div className="relative cursor-pointer mr-2 group" onClick={() => navigate('/cart')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </div>

        {user ? (
          <div
            className="profile-container"
            style={{ position: "relative" }}
            ref={dropdownRef}
          >
            <div
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getInitials(user.name)}
            </div>
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => {
                  setShowDropdown(false);
                  navigate('/profile');
                }}>
                  Manage Profile
                </div>
                <div className="dropdown-item" onClick={handleSignOut}>
                  Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-cta">
              Get started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
