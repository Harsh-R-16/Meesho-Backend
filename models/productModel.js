const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
  },
  type: {
    type: String,
    required: [true, "Product type is required."],
  },
  sprice: {
    type: Number,
    required: [true, "Product Selling Price is required."],
  },
  aprice: {
    type: Number,
    required: [true, "Product Actual Price is required."],
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: Number,
    default: 1,
  },
  img: {
    type: String,
    required: [true, "Product Image is required."],
  },
  similar: [
    {
      type: String,
    },
  ],
  soldBy: {
    type: String,
    required: [true, "Seller name is required."],
  },
  details: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
