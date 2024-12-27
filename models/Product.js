const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  images: {
    type: [String],  // Array of image URLs
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],  // Array of sizes like ["S", "M", "L"]
    required: true
  },
  price: {
    type: Number,  // Original price of the product
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  },
  availableQuantity: {
    type: Number,  
    required: true
  },
  discount: {
    type: Number,  // Discount percentage (e.g., 20 for 20% off)
    default: 0
  }
});

// Virtual field for discounted price
productSchema.virtual('discountedPrice').get(function () {
  if (this.discount > 0) {
    return this.price - (this.price * (this.discount / 100));
  }
  return this.price;  // No discount, return the original price
});

module.exports = mongoose.model('Product', productSchema);
