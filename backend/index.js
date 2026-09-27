import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import blogRouter from "./routes/recipe.router.js";
import commentRouter from "./routes/comment.router.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || true);
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  }

  return res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening to http://localhost:${port}`);
});
