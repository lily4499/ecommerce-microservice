import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
    const [page, setPage] = useState('products'); // Tracks current page
    const [checkoutItems, setCheckoutItems] = useState([]); // Items for Checkout

    // Navigation Handlers
    const navigateToCart = () => setPage('cart');
    const navigateToProducts = () => setPage('products');
    const handleCheckout = (items) => {
        setCheckoutItems(items);
        setPage('checkout');
    };

    return (
        <div className="container mt-4">
            {/* Page Title */}
            <h1 className="text-center">E-Commerce App</h1>

            {/* Navigation */}
            <nav className="my-4">
                <button
                    className={`btn btn-primary me-2 ${page === 'products' ? 'active' : ''}`}
                    onClick={navigateToProducts}
                >
                    Products
                </button>
                <button
                    className={`btn btn-primary ${page === 'cart' ? 'active' : ''}`}
                    onClick={navigateToCart}
                >
                    Cart
                </button>
            </nav>

            {/* Page Rendering */}
            <div>
                {page === 'products' && <ProductList />}
                {page === 'cart' && <Cart onCheckout={handleCheckout} />}
                {page === 'checkout' && <Checkout items={checkoutItems} />}
            </div>
        </div>
    );
};

export default App;

