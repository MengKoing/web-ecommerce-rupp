import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products based on selected category
  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  // Handle adding items to the cart
  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If product already exists, increment quantity
      existingProduct.quantity += 1;
    } else {
      // If product doesn't exist, add it to the cart with quantity 1
      storedCart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Trigger a localStorage event to update cart count in HeroArea
    window.dispatchEvent(new Event("storage"));
    alert(`${product.title} has been added to your cart!`);
  };

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Menu</h2>
        </div>

        {/* Filter Menu */}
        <ul className="filters_menu">
          <li
            className={`active ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </li>
          <li onClick={() => setFilter("men's clothing")}>Men's Clothing</li>
          <li onClick={() => setFilter("women's clothing")}>Women's Clothing</li>
          <li onClick={() => setFilter("jewelery")}>Jewelry</li>
          <li onClick={() => setFilter("electronics")}>Electronics</li>
        </ul>

        {/* Product Grid */}
        <div className="filters-content">
          <div className="row grid">
            {filteredProducts.slice(0, 8).map((product) => (
              <div className="col-sm-6 col-lg-4 all" key={product.id}>
                <div className="box">
                  <div>
                    <div className="img-box">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="detail-box">
                      <h5>{product.title}</h5>
                      <p>{product.description.substring(0, 100)}...</p>
                      <div className="options">
                        <h6>${product.price}</h6>
                        <button
                          onClick={() => handleAddToCart(product)}
                          style={{
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => navigate("/cart")} style={{ marginTop: "20px" }}>
          Go to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
