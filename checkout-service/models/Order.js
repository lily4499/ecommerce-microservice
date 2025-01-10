const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);

