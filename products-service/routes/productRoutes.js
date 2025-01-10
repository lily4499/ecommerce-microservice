const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch products.' });
    }
});

// Seed products
router.post('/seed', async (req, res) => {
    const products = [
        { name: "Laptop", price: 800, description: "High-performance laptop for productivity and gaming." },
        { name: "Smartphone", price: 600, description: "Latest model smartphone with cutting-edge features." },
        { name: "Smartwatch", price: 250, description: "Wearable device with health tracking and notifications." },
        { name: "Wireless Earbuds", price: 150, description: "Noise-cancelling earbuds with great sound quality." },
        { name: "4K Monitor", price: 400, description: "Ultra HD monitor for crisp and clear visuals." },
        { name: "Gaming Keyboard", price: 100, description: "Mechanical keyboard designed for gaming." },
        { name: "External SSD", price: 200, description: "High-speed external SSD for storage and backup." },
        { name: "Graphics Card", price: 500, description: "Powerful GPU for gaming and video editing." },
        { name: "Drone", price: 1000, description: "High-tech drone with 4K camera and GPS." },
        { name: "VR Headset", price: 350, description: "Virtual reality headset for immersive experiences." }
    ];

    try {
        await Product.insertMany(products);
        res.json({ message: 'Technology products seeded successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to seed products.' });
    }
});

module.exports = router;

