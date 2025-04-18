import jwt from "jsonwebtoken";
import userModel from "../../../models/user/index.js";
import bcrypt from "bcrypt";
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email:email  });
    if (!user) {
      return res
        .status(404)
        .json({user,
          message:
            "This user does not exist. So please first signup than login"
        });
      }
      
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "InCorrect Password" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, "1234", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: `${user.email} logged in successfully`,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

export default loginController;
