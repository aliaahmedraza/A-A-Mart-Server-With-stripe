import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      price: {
        type: Number, 
        required: true,
      },
    },
  ],
  totalprice: {
    type: Number, 
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const orderModel = mongoose.model("Order", OrderSchema);
export default orderModel;
