const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // Initialize app here

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/cart', cartRoutes);

// Server Start
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Cart service running on port ${port}`);
});

