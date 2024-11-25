import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (id, increment = true) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <button onClick={() => navigate("/")}>Go Shopping</button>
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.image} alt={item.title} />
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.id, false)}>-</button>
                    {item.quantity}
                    <button onClick={() => handleQuantityChange(item.id, true)}>+</button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h2>Total: ${calculateTotal()}</h2>
          </div>
          <div className="cart-buttons">
            <button className="clear-cart" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
