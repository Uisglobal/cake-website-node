const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  shippingCost: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
