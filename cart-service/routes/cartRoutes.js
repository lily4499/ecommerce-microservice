const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Get cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne() || { items: [] };
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the cart.' });
    }
});

// Add item to cart
router.post('/add', async (req, res) => {
    const { productId, name, price } = req.body;

    try {
        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.items.push({ productId, name, price, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to the cart.' });
    }
});

// Remove item from cart
router.post('/remove', async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne();

        if (cart) {
            cart.items = cart.items.filter(item => item.productId !== productId);
            await cart.save();
        }

        res.status(200).json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from the cart.' });
    }
});

module.exports = router;

