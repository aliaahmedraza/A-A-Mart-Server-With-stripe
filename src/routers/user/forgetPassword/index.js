import express from "express";
import forgetPasswordController from "../../../controllers/user/forgetPassword/index.js";
const forgetPasswordRouter = express.Router();
forgetPasswordRouter.post("/forgetpassword", forgetPasswordController);
export default forgetPasswordRouter;
