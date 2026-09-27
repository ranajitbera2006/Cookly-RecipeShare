import mongoose from "mongoose";
import Recipe from "../model/recipe.model.js";
import Comment from "../model/comment.model.js";
import imagekit from "../db/imageKit.js";
import { upload } from "../middleware/multer.js";

export const addRecipeController = async (req, res) => {
  try {
    // 1. Parse body payload (supports JSON strings from FormData or parsed body)
    let blogData = req.body;
    if (typeof req.body.blog === "string") {
      try {
        blogData = JSON.parse(req.body.blog);
      } catch (err) {
        return res.status(400).json({ error: "Invalid blog data format." });
      }
    }

    const { title, subtitle, category, content, status } = blogData;
    const author = req.user?._id;
    const imageFile = req.file;

    // 2. Validate required fields
    if (!title?.trim() || !category || !content?.trim() || !author) {
      return res.status(400).json({
        error: "Please fill all required fields: title, category, and content.",
      });
    }

    // 3. Validate category enum match
    const validCategories = [
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "snack",
      "drink",
      "other",
    ];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: "Invalid category selected." });
    }

    // 4. Validate title length based on schema limit
    if (title.trim().length > 150) {
      return res.status(400).json({
        error: "Title cannot exceed 150 characters.",
      });
    }

    // 5. Upload image to ImageKit if provided
    let imageUrl = undefined; // undefined triggers schema's default iStock image

    if (imageFile) {
      const uploadResponse = await imagekit.upload({
        file: imageFile.buffer.toString("base64"),
        fileName: `${Date.now()}_${imageFile.originalname}`,
        folder: "/recipes",
      });

      // ImageKit transformation URL (WebP, auto quality, max-width 1280px)
      imageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/tr:q-auto,f-webp,w-1280${uploadResponse.filePath}`;
    }

    // 6. Instantiate & save document
    const newRecipe = new Recipe({
      title: title.trim(),
      subtitle: subtitle?.trim() || "",
      author,
      category: category.toLowerCase(),
      content,
      image: imageUrl, // Falls back to your schema default if undefined
      status: status === "published" ? "published" : "draft",
    });

    await newRecipe.save();

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully!",
      blog: newRecipe,
    });
  } catch (error) {
    console.error("Error in addRecipeController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllRecipeController = async (req, res) => {
  try {
    const category = req.params.category || req.query.category;
    const { search } = req.query;

    const filter = { status: "published" };
    if (category && category.toLowerCase() !== "all") {
      filter.category = new RegExp(`^${category}$`, "i");
    }
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { ingredients: searchRegex },
      ];
    }

    const recipes = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "fullname profilePic");

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in getAllRecipeController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getRecipeDetailsController = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Invalid user id." });
    }
    const recipes = await Recipe.findById(recipeId).populate(
      "author",
      "fullname",
    );
    if (!recipes) {
      return res.status(200).json({ message: "Invalid Recipe's Id." });
    }
    return res.status(200).json(recipes);
  } catch (error) {
    console.log("Error in getRecipeDetailsController ", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAuthorRecipeController = async (req, res) => {
  try {
    const authorId = req.user?._id;

    if (!authorId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const recipes = await Recipe.find({ author: authorId }).sort({
      createdAt: -1,
    });
    if (!recipes) {
      return res
        .status(200)
        .json({ message: "You have not posted any recipes yet." });
    }
    return res.status(200).json(recipes);
  } catch (error) {
    console.log("Error in getAuthorRecipeController ", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};
export const deleteAuthorRecipeController = async (req, res) => {
  try {
    const authorId = req.user?._id;
    const recipeId = req.params.recipeId;
    if (!authorId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    //Delete the blog's
    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      author: authorId,
    });
    if (!deletedRecipe) {
      return res.status(404).json({
        error: "Recipe not found or you do not have permission to delete it.",
      });
    }
    //Delete this blog's commemts
    await Comment.deleteMany({ blog: recipeId });

    return res
      .status(200)
      .json({ deletedRecipe, message: "Recipe deleted successfully." });
  } catch (error) {
    console.log("Error in deleteAuthorRecipeController ", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//Update Recipe

export const updateRecipeController = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const authorId = req.user?._id;
    const imageFile = req.file;

    if (!authorId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // Parse body payload (supports both stringified FormData JSON and standard JSON body)
    let bodyData = req.body;
    if (typeof req.body.blog === "string") {
      try {
        bodyData = JSON.parse(req.body.blog);
      } catch (err) {
        return res.status(400).json({ error: "Invalid blog data format." });
      }
    }

    const { title, subtitle, category, content, status, image } = bodyData;
    const updateData = {};

    // Conditionally assign text fields
    if (title && title.trim() !== "") {
      if (title.trim().length > 150) {
        return res
          .status(400)
          .json({ error: "Title cannot exceed 150 characters." });
      }
      updateData.title = title.trim();
    }

    if (subtitle !== undefined) {
      updateData.subtitle = subtitle.trim();
    }

    if (category && category.trim() !== "") {
      const validCategories = [
        "breakfast",
        "lunch",
        "dinner",
        "dessert",
        "snack",
        "drink",
        "other",
      ];
      if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ error: "Invalid category selected." });
      }
      updateData.category = category.toLowerCase();
    }

    if (content && content.trim() !== "" && content !== "<p><br></p>") {
      updateData.content = content;
    }

    if (status && status.trim() !== "") {
      updateData.status = status;
    }

    //  Handle image logic:
    //  If a new file is uploaded, upload to ImageKit
    if (imageFile) {
      const uploadResponse = await imagekit.upload({
        file: imageFile.buffer.toString("base64"),
        fileName: `${Date.now()}_${imageFile.originalname}`,
        folder: "/recipes",
      });
      updateData.image = `${process.env.IMAGEKIT_URL_ENDPOINT}/tr:q-auto,f-webp,w-1280${uploadResponse.filePath}`;
    }
    // B) Else if an existing image URL string was passed, preserve it
    else if (image && typeof image === "string" && image.trim() !== "") {
      updateData.image = image.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided to update." });
    }

    // 4. Update the blog document with ownership check
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, author: authorId },
      { $set: updateData },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        error: "Recipe not found or you do not have permission to edit it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully.",
      blog: updatedRecipe,
    });
  } catch (error) {
    console.error("Error in updateRecipeController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//Like the blog
export const toggleLikedController = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { recipeId } = req.params;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid blog Id." });
    }
    const blog = await Recipe.findById(recipeId);
    if (!blog) {
      return res.status(404).json({ error: "Recipe is not found." });
    }
    const isLiked = blog.likes.some(
      (id) => id.toString() === userId.toString(),
    );
    const updateLikes = isLiked
      ? { $pull: { likes: userId } } //$pull removes if exists
      : { $addToSet: { likes: userId } }; //$addToSet adds without duplicates

    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, updateLikes, {
      returnDocument: "after",
    });
    return res.status(200).json({
      message: isLiked ? "Recipe unliked" : "Recipe liked",
      isLiked: !isLiked,
      totalLikes: updateRecipe.likes.length,
    });
  } catch (error) {
    console.log("Error in toggleLikedController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};
