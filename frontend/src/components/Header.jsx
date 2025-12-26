import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
