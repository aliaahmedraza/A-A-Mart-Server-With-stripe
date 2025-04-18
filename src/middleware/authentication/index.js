import jwt from "jsonwebtoken";
import userModel from "../../models/user/index.js";

const AuthenticationMiddleware = async (req, res, next) => {
  const headers = req.headers;
  let token = headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    token = token.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(userData, "decode");

    const userVerification = await userModel.findById(userData.id );    
    
    if (!userVerification) {
      return res.status(404).json({ message: "User is not Authenticated" }); 
    }

    req.user = userData;
    next(); 
  } catch (error) {
    console.error(error, "error");
    return res
      .status(401)
      .json({ message: "Invalid token - please login again" });
  }
};

export default AuthenticationMiddleware;
