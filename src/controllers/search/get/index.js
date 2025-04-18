import productModel from "../../../models/product/index.js";

const searchController = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }
    const results = await productModel.find({
      title: { $regex: title, $options: "i" },
    });
      
    if (results.length===0) {
        res.status(404).json({ message: "No result found for this" });
    } else {
      const titles = results.map((item) => item.title);
      res.status(200).json(titles);
    }
  } catch (error) {
    console.error("Search error: ", error);
    res.status(500).json({ message: "Server error occurred during search" });
  }
};

export default searchController;
