const { useState, useEffect } = React;

function App() {
    // State to hold items loaded from SQLite Backend
    const [products, setProducts] = useState([]);
    
    // State to hold cart items
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from our Express Node.js backend
    useEffect(() => {
        // Fetch API request
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    // Add item to cart
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Calculate total price of cart
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    return (
        <div>
            {/* Navigation Header */}
            <nav className="navbar">
                <div className="nav-container">
                    <h1>TechStore <span style={{fontSize:'0.8rem', opacity:0.7}}>(React+Node+SQLite)</span></h1>
                    <div className="cart-icon">🛒 Cart ({cart.length})</div>
                </div>
            </nav>

            <div className="container">
                <div className="layout">
                    
                    {/* Products Grid */}
                    <div className="products-grid">
                        {loading ? (
                            <h3>Loading products from SQLite database...</h3>
                        ) : (
                            products.map(product => (
                                <div key={product.id} className="product-card">
                                    <img src={product.image} alt={product.name} className="product-img" />
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                        <div className="product-price">${product.price.toFixed(2)}</div>
                                        <button 
                                            className="add-btn" 
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Shopping Cart Sidebar */}
                    <div className="sidebar">
                        <div className="cart-card">
                            <h2 className="cart-header">Your Cart</h2>
                            
                            {cart.length === 0 ? (
                                <p style={{color: '#7f8c8d'}}>Cart is empty.</p>
                            ) : (
                                <div>
                                    {cart.map((item, index) => (
                                        <div key={index} className="cart-item">
                                            <span>{item.name}</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    
                                    <div className="cart-total">
                                        <span>Total:</span>
                                        <span>${total}</span>
                                    </div>
                                    
                                    <button className="checkout-btn" onClick={() => alert('Order Placed Successfully!')}>
                                        Checkout Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Map the React App Component to the HTML Root Div
const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);
