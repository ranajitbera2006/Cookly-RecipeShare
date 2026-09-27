import Recipe from "../model/recipe.model.js";
import Comment from "../model/comment.model.js";

//Add comment
export const addCommentController = async (req, res) => {
  try {
    const { id, comment } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized!" });
    }
    const newComment = new Comment({
      blog: id,
      user: userId,
      comment,
    });
    await newComment.save();
    await newComment.populate("user", "fullname profilePic email");
    return res
      .status(201)
      .json({ newComment, message: "Comment added successfully!" });
  } catch (error) {
    console.log("Error in addCommentController ", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get comment
export const getCommentController = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ blog: recipeId })
      .populate("user", "fullname profilePic email updatedAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error in getCommentController ", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//delete comment
export const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized! Please log in." });
    }

    // 1. Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // 2. Find the associated blog
    const blog = await Recipe.findById(comment.blog).select("author");
    if (!blog) {
      return res.status(404).json({ error: "Associated blog not found." });
    }

    // 3. Check ownership (Comment Creator OR Recipe Author)
    const isCommentAuthor = comment.user.toString() === userId.toString();
    const isRecipeAuthor = blog.author.toString() === userId.toString();

    if (!isCommentAuthor && !isRecipeAuthor) {
      return res.status(403).json({
        error: "Forbidden! You do not have permission to delete this comment.",
      });
    }

    // 4. Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteCommentController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//update comment
export const updateCommentController = async (req, res) => {
  try {
    const { comment } = req.body;
    const { commentId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    let updateData = {};
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment text cannot be empty." });
    }
    updateData.comment = comment;
    const updateComment = await Comment.findOneAndUpdate(
      { _id: commentId, user: userId },
      { $set: updateData },
      { returnDocument: "after", runValidators: true },
    ).populate("user", "fullname profilePic email");
    if (!updateComment) {
      return res.status(404).json({
        error: "Comment not found or you do not have permission to edit it.",
      });
    }
    return res
      .status(200)
      .json({ updateComment, message: "Comment updated successfully." });
  } catch (error) {
    console.log("Error in updateCommentController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};
