import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    subtitle: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/873a932c-f520-48f1-b3c1-ca039fa3523d.__CR0,0,1600,1200_PT0_SX800_V1___.jpg",
    },
    category: {
      type: String,
      enum: [
        "breakfast",
        "lunch",
        "dinner",
        "dessert",
        "snack",
        "drink",
        "other",
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog",
});

const Recipe = mongoose.model("Recipe", blogSchema);
export default Recipe;
