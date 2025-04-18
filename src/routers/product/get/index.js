import express from "express";
import productGetController from "../../../controllers/product/get/index.js";

const imageGetRouter = express.Router();
imageGetRouter.get("/product",productGetController);
export default imageGetRouter;


