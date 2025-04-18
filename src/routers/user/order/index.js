import express from "express";
import orderController from "../../../controllers/user/order/index.js";
import AuthenticationMiddleware from "../../../middleware/authentication/index.js";
const orderRouter = express.Router();
orderRouter.post("/order",AuthenticationMiddleware, orderController);
export default orderRouter;
