import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "15d",
  });

  const forwardedProto = res.req?.headers["x-forwarded-proto"]
    ?.toString()
    .split(",")[0]
    .trim();
  const useSecureCookie =
    process.env.NODE_ENV === "production" || forwardedProto === "https";

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: useSecureCookie ? "none" : "lax",
    secure: useSecureCookie,
    path: "/",
  });
};
export default generateTokenAndSetCookie;
