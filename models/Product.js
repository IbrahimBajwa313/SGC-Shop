const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      desc: { type: String, required: true },
      imgThumbnail: { type: String, required: true },
      imgages: {
        type: [String],
        required: false,
        default: [],
      },
      category: { type: String, required: true },
      size: { type: String, required: false },
      color: { type: String, required: false },
      price: { type: Number, required: true },
      availableQty: { type: Number, required: false },
    },
    { timestamps: true }
  );
  
 
mongoose.models = {};

const Product = mongoose.models.products || mongoose.model("products", ProductSchema);
export default Product;
