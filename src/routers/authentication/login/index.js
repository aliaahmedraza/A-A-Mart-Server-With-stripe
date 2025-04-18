import express from "express";
import loginController from "../../../controllers/authentication/login/index.js";
const loginRouter = express.Router();
loginRouter.post("/login", loginController);
export default loginRouter;
