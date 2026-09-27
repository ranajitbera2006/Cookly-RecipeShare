import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ error: "Unauthorized! token is not passed." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized! token is not valid." });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectAuth ", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
export default protectAuth;
