import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HeroArea() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(itemCount);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    // Initial cart count when component mounts
    updateCartCount();

    // Listener for localStorage updates when cart is modified
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="header_section sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <Link className="navbar-brand" to="/">
            <span>Feane</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  <i className="fas fa-utensils"></i> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="fas fa-info-circle"></i> About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </li>
            </ul>

            {/* Cart Icon */}
            <div className="user_option">
              <li>
                <Link className="nav-link position-relative" to="/cart">
                  <i className="fas fa-shopping-cart cart-icon"></i>
                  {cartCount > 0 && (
                    <span className="badge bg-light rounded-pill position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <a href="#" className="order_online">
                <i className="fas fa-shopping-bag"></i> Order Online
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeroArea;
