import path from "path";
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
const __dirname = path.resolve();

app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin exists (curl, Postman, server-to-server), pass true,origin mean the frontend url
      callback(null, origin || true);
    },
    credentials: true, // Sends Access-Control-Allow-Credentials: true
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//  Essential Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


//  API Routes
app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

//  Global Error Handler (Intercepts Multer & Server Errors and sends JSON) 
app.use((err, req, res, next) => {
  // console.error("Server Error:", err.message);

  if (err.name === "MulterError") {
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  }

  return res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening to http://localhost:${port}`);
});
