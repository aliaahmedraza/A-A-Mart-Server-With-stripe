import productModel from "../../../models/product/index.js";

const productGetController = async (req, res) => {
  try {
    const products = await productModel.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }
    const productDetails = products.map((product) => {
    //   const imageUrl = product?.image?.data
    //     ? product.image.data
    //     : `/product/image/${product._id}`;
    //   console.log("product", product);

    //   console.log("product image", product.image);
      return {
        _id: product._id,
        title: product.title,
        description: product.description,
        link: product.link,
        price: product.price,
      };
    });

    return res.status(200).json({ products: productDetails });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default productGetController;
