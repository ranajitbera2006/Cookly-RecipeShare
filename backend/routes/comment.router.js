import express from "express";
import {
  addCommentController,
  deleteCommentController,
  getCommentController,
  updateCommentController,
} from "../controller/comment.controller.js";
import protectAuth from "../middleware/protectAuth.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", protectAuth, addCommentController);
commentRouter.get("/get-comment/:recipeId", getCommentController);
commentRouter.delete(
  "/delete-comment/:commentId",
  protectAuth,
  deleteCommentController,
);
commentRouter.patch(
  "/update-comment/:commentId",
  protectAuth,
  updateCommentController,
);

export default commentRouter;
