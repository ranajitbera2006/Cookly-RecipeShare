import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

commentSchema.index({ blog: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
