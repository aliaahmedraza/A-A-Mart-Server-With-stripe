import productModel from "../../../models/product/index.js";

const productController = async (req, res) => {
  try {
    const { title, description,price,link} = req.body;

    // if (!req.file || !req.file.buffer) {
    //   return res.status(400).json({
    //     error:
    //       "No image uploaded. Make sure to include an image with the key 'image'.",
    //   });
    // }

    // const {  buffer, mimetype } = req.file; 

    if (!title || !description || !link || !price) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProduct = await productModel.create({
      title,
      description,
      price,
      link
    
    });

    res.status(201).json({
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default productController;
