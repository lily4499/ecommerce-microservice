import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products from:', process.env.REACT_APP_PRODUCTS_URL || 'http://localhost:5000/products');
                const response = await axios.get(process.env.REACT_APP_PRODUCTS_URL || 'http://localhost:5000/products');
                console.log('Fetched products:', response.data);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        try {
            console.log('Adding to cart:', product);
            await axios.post(
                (process.env.REACT_APP_CART_URL || 'http://localhost:5001/cart') + '/add',
                product
            );
            alert(`${product.name} has been added to the cart.`);
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add product to the cart. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <div key={product._id} className="product">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;

