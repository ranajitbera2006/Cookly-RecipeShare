import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true, // Prevent XSS
    sameSite: "lax", // Must be "lax" for local dev proxy
    secure: process.env.NODE_ENV === "production", //  Must be false during localhost development
  });
};
export default generateTokenAndSetCookie;
