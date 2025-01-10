const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
