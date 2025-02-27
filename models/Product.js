import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "/placeholder.jpg" }  // Optional
});

const Product = mongoose.model("Product", productSchema);
export default Product;
