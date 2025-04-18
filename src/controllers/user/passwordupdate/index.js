import jwt from "jsonwebtoken";
import userModel from "../../../models/user/index.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const updatePasswordController = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (token.split(".").length !== 3) {
      return res.status(400).json({ message: "Malformed token" });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: "Token has expired. Please request a new password reset.",
        });
      } else {
        return res.status(400).json({ message: "Invalid token" });
      }
    }

    const Email = decodedToken?.recipient;
    if (!Email) {
      return res.status(400).json({ message: "Invalid token: No email found" });
    }

    const user = await userModel.findOne({ email: Email });
    if (!user) {
      return res.status(404).json({ message: "This email is not registered" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Your password has been updated successfully" });
  } catch (error) {
    console.error("Error processing token:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export default updatePasswordController;
