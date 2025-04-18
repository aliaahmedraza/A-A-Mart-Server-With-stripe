import express from "express";
import updatePasswordController from "../../../controllers/user/passwordupdate/index.js";
const updatepasswordRouter = express.Router();
updatepasswordRouter.put("/updatepassword/:token", updatePasswordController);
export default updatepasswordRouter;
