import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ onCheckout }) => {
    const [cart, setCart] = useState({ items: [] });

    useEffect(() => {
        axios.get(process.env.REACT_APP_CART_URL)
            .then(response => setCart(response.data))
            .catch(error => console.error(error));
    }, []);

    const removeFromCart = (productId) => {
        axios.post(`${process.env.REACT_APP_CART_URL}/remove`, { productId })
            .then(() => {
                setCart(prevCart => ({
                    ...prevCart,
                    items: prevCart.items.filter(item => item.productId !== productId)
                }));
                alert('Item removed from cart');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.items.map(item => (
                        <div key={item.productId}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={() => onCheckout(cart.items)}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;

