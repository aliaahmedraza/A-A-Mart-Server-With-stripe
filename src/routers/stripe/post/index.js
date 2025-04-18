import express from "express";
import stripePostController from "../../../controllers/stripe/post/index.js"
const stripePostRouter = express.Router();
stripePostRouter.post("/create-checkout-session", stripePostController);
export default stripePostRouter;