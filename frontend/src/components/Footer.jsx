import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>VISION.</h3>
          <p>
            Premium eyewear that blends style, comfort, and clarity.
            Designed for the modern vision.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact</Link>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <Link to="/contact-us">FAQ</Link>
          <Link to="/contact-us">Returns</Link>
          <Link to="/contact-us">Privacy Policy</Link>
          <Link to="/contact-us">Terms of Service</Link>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {/* Placeholders for social icons */}
            <span>Instagram</span>
            <span>Twitter</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VISION. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
