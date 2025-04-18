import express from "express";
import productController from "../../../controllers/product/post/index.js";
const productPostRouter = express.Router();
productPostRouter.post("/productpost", productController);
export default productPostRouter;
