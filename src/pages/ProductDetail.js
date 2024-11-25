import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product by dynamic ID
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => {

                setProduct(json);
                setLoading(false);
                window.scrollTo(0, 0)
            })
            .catch(err => {
                setError('Failed to load product');
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // Fetch product by dynamic ID
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => {
                setProduct(json);

                // Fetch related products after loading the current product
                fetch('https://fakestoreapi.com/products')
                    .then(res => res.json())
                    .then(products => {
                        // Filter out the current product to avoid showing it as a related product
                        const filteredProducts = products.filter(p => p.id !== Number(id));

                        // Filter out products that belong to the same category as the current product
                        const relatedProductsByCategory = filteredProducts.filter(product => product.category === json.category);

                        // Set the related products (limit to 4)
                        setRelatedProducts(relatedProductsByCategory.slice(0, 4));
                    })
                    .catch(err => {
                        setError('Failed to load related products');
                    });

            })
            .catch(err => {
                setError('Failed to load product');
            });
    }, [id]);



    // Add to cart function
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist in localStorage
        alert(`${product.title} added to cart!`);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-container">
            <div className="product-details">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>

                    {/* Display Stock Info */}
                    <p className="product-stock">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>


                    {/* Add to Cart Button with stock check */}
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}  // Disable button if out of stock
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>


            {/* Related Products Section */}
            <div className="related-products">
                <h2>Related Products</h2>
                <div className="related-products-list">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.id} className="related-product-card">
                                <img src={relatedProduct.image} alt={relatedProduct.title} />
                                <h3>{relatedProduct.title}</h3>
                                <p>${relatedProduct.price}</p>
                                <button className="view-product-btn">
                                    <Link to={`/shop/${relatedProduct.id}`}>View Product</Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No related products found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;
