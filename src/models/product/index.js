import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("Product", ProductSchema);
export default productModel;
