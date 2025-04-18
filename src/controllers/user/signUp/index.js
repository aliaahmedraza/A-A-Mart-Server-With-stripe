import userModel from "../../../models/user/index.js";
import bcrypt from "bcrypt";

const userController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ where: { email: email } });
    if (!foundUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } else
      res
        .status(400)
        .json({ message: "Your account has already been registered" });
  } catch (error) {
    console.error("Error inserting data into User model:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default userController;
