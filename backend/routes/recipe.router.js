import express from "express";
import {
  addRecipeController,
  deleteAuthorRecipeController,
  getAllRecipeController,
  getAuthorRecipeController,
  getRecipeDetailsController,
  toggleLikedController,
  updateRecipeController,
} from "../controller/recipe.controller.js";
import protectAuth from "../middleware/protectAuth.js";
import { upload } from "../middleware/multer.js";

const blogRouter = express.Router();

// Routes with image upload support
blogRouter.post(
  "/addRecipe",
  protectAuth,
  upload.single("recipeImage"),
  addRecipeController,
);

blogRouter.patch(
  "/update-recipe/:recipeId",
  protectAuth,
  upload.single("recipeImage"),
  updateRecipeController,
);

// Read, delete, and interaction routes
blogRouter.get("/all-recipe", getAllRecipeController);
blogRouter.get("/all-recipe/:category", getAllRecipeController);
blogRouter.get("/author-recipe", protectAuth, getAuthorRecipeController);
blogRouter.get("/details/:recipeId", protectAuth, getRecipeDetailsController);
blogRouter.delete(
  "/delete-recipe/:recipeId",
  protectAuth,
  deleteAuthorRecipeController,
);
blogRouter.patch("/likes/:recipeId", protectAuth, toggleLikedController);

export default blogRouter;
