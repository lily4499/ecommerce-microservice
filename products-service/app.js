require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

const cors = require('cors');
app.use(cors());


const MONGO_URI = process.env.MONGO_URI;


app.use(express.json());
app.use('/products', productRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Products Service connected to MongoDB'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Products Service running on port ${PORT}`));

