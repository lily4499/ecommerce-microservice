const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Checkout and save order
router.post('/', async (req, res) => {
    const { items } = req.body;

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
        // Save the order to the database
        const order = new Order({ items, total });
        await order.save();

        res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (error) {
        res.status(500).json({ error: 'Unable to place order' });
    }
});

module.exports = router;

