import orderModel from "../../../models/order/index.js";
import productModel from "../../../models/product/index.js";

const orderController = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required." });
    }

    const userid = req.user.id;

    if (!userid) {
      return res.status(401).json({ message: "Invalid token." });
    }

    let totalprice = 0;
    const productsWithPrice = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.findById(item.productid);
        if (!product) {
          throw new Error(`Product with ID ${item.productid} not found.`);
        }

        const itemPrice = product.price * item.quantity;
        totalprice += itemPrice;

        return {
          productid: item.productid,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const newOrder = new orderModel({
      products: productsWithPrice,
      totalprice,
      userid,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
      totalprice: totalprice,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while placing the order.", error });
  }
};

export default orderController;
