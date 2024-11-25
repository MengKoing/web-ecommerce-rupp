import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isShippingDifferent, setIsShippingDifferent] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);


    useEffect(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(storedCart);

            const total = storedCart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            setTotalAmount(parseFloat(total.toFixed(2))); // Ensure consistent formatting
        } catch (error) {
            console.error("Error loading cart items from localStorage:", error);
        }
    }, []);

    const handlePaymentSuccess = (details, data) => {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        console.log("Transaction Details:", details, data);
    };

    const initialPayPalOptions = {
        "client-id": "AdkIKeolir9SkeTBaEPAY9C28SIv4PVGjo0QYcGuSs_kgCEUdBXzfgeIh1Um_vL7ANkbeq7V8JQihtc4",
        currency: "USD",
    };

    const handleShippingToggle = () => {
        setIsShippingDifferent(!isShippingDifferent);
    };

    const handleCreateAccountToggle = () => {
        setCreateAccount(!createAccount);
    };

    return (
        <div>
            {/* Page Header */}
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Checkout</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Section */}
            <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        {/* Billing Details */}
                        <div className="col-md-6">
                            <section>
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </div>
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="company">Company Name (Optional)</label>
                                    <input type="text" className="form-control" id="company" />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="address">Street Address *</label>
                                    <input type="text" className="form-control" id="address" placeholder="House number and street name" required />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="city">Town/City *</label>
                                    <input type="text" className="form-control" id="city" required />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="phone">Phone *</label>
                                    <input type="tel" className="form-control" id="phone" required />
                                </div>
                                <div className="form-check mb-3 ">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="createAccount"
                                        checked={createAccount}
                                        onChange={handleCreateAccountToggle}
                                    />
                                    <label className="form-check-label" htmlFor="createAccount">
                                        Create an account?
                                    </label>
                                </div>
                                {createAccount && (
                                    <div className="mb-3">
                                        <label htmlFor="password">Account Password *</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                )}
                            </section>

                            {/* Shipping Details */}
                            <section className="mt-4">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="differentShipping"
                                        checked={isShippingDifferent}
                                        onChange={handleShippingToggle}
                                    />
                                    <label className="form-check-label" htmlFor="differentShipping">
                                        Ship to a different address?
                                    </label>
                                </div>
                                {isShippingDifferent && (
                                    <div>
                                        <h4>Shipping Details</h4>
                                        <div className="mb-3">
                                            <label htmlFor="shippingAddress">Street Address *</label>
                                            <input type="text" className="form-control" id="shippingAddress" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="shippingCity">Town/City *</label>
                                            <input type="text" className="form-control" id="shippingCity" required />
                                        </div>
                                    </div>
                                )}
                            </section>

                        </div>


                        {/* Order Summary */}
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <table className="table site-block-order-table mb-5">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {item.title} <strong className="mx-2">x</strong>{" "}
                                                            {item.quantity}
                                                        </td>
                                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>Order Total</strong>
                                                    </td>
                                                    <td className="text-black font-weight-bold">
                                                        <strong>${totalAmount}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>


                                        {/* PayPal Payment Section */}
                                        <PayPalScriptProvider options={initialPayPalOptions}>
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: totalAmount, // Ensure valid total amount
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then((details) => {
                                                        handlePaymentSuccess(details, data);
                                                    });
                                                }}
                                                onError={(err) => {
                                                    console.error("PayPal Checkout Error:", err);
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CheckoutForm;

