import express from "express";
import searchController from "../../../controllers/search/get/index.js";
const searchRouter = express.Router();
searchRouter.get("/search", searchController);
export default searchRouter;