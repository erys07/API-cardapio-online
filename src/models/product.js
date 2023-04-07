const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: { 
        type: String,
        required: true,
    },
    qty: { 
        type: Number,
        required: true,
    },
    price: { 
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;