import express from "express"; 
import userController from "../../../controllers/user/signUp/index.js";
const userRouter = express.Router();
userRouter.post("/signup", userController);
export default userRouter;
