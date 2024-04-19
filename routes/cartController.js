// router.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose

const Cart = require('../Models/Carts');

// GET cart by user ID
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('products.productId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST cart
router.post('/:userId', async (req, res) => {
    const { products } = req.body;

    try {
        // Generate a new ObjectId for cartId
        const cartId = new mongoose.Types.ObjectId();

        // Create a new cart document
        const cart = new Cart({
            cartId: cartId,
            user: req.params.userId,
            products: products
        });

        // Save the cart document
        await cart.save();

        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update cart
router.put('/:userId', async (req, res) => {
    const { products } = req.body;

    try {
        let cart = await Cart.findOneAndUpdate({ user: req.params.userId },
            { $set: { products: products } },
            { new: true });

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete cart
router.delete('/:userId', async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ user: req.params.userId });
        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
