import express from "express";
import {
  deleteAccountController,
  getUserController,
  loginController,
  logoutController,
  signupController,
  updateAccountController,
} from "../controller/auth.controller.js";
import protectAuth from "../middleware/protectAuth.js";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.delete("/delete-account", protectAuth, deleteAccountController);
authRouter.get("/get-user/:userId", getUserController);
authRouter.patch("/update-account", protectAuth, updateAccountController);

export default authRouter;
