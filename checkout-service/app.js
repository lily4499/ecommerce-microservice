require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const checkoutRoutes = require('./routes/checkoutRoutes');

const cors = require('cors');
app.use(cors());


const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use('/checkout', checkoutRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Checkout Service connected to MongoDB'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Checkout Service running on port ${PORT}`));

