import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import settingsRoutes from "./routes/setting.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { globalRateLimiter } from "./middlewares/rate_limiter.middleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalRateLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    uptime: process.uptime(),
    memory: process.memoryUsage().heapUsed / 1024 / 1024 + " MB"
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/tag", tagRoutes);
app.use("/api/v1/setting", settingsRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});