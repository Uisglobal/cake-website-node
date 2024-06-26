const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [cartItemSchema], // Array of cart items with details
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to generate a new ObjectId for cartId
cartSchema.pre('save', function(next) {
    if (!this.cartId) {
        this.cartId = new mongoose.Types.ObjectId();
    }
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
