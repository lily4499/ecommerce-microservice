import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ items }) => {
    const [orderId, setOrderId] = useState(null);

    const handleCheckout = () => {
        axios.post(process.env.REACT_APP_CHECKOUT_URL, { items })
            .then(response => {
                setOrderId(response.data.orderId);
                alert('Order placed successfully!');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Checkout</h1>
            {orderId ? (
                <div>
                    <p>Thank you for your purchase!</p>
                    <p>Your Order ID: {orderId}</p>
                </div>
            ) : (
                <div>
                    <h2>Order Summary</h2>
                    {items.map(item => (
                        <div key={item.productId}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                    <button onClick={handleCheckout}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;

