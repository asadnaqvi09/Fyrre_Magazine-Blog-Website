import express from "express";
import * as blogController from "../controllers/blog.controller.js";
import { toggleLike } from "../controllers/like.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { blogLimiter } from "../middlewares/rate_limiter.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

// Public routes
router.get("/blogs", blogController.getAllBlogs); // Access by user in All Blogs Page with pagination and filtering Logic .Also used in admin panel where admin can see all blogs with pagination and filtering Logic.
router.get("/:slug", blogController.getSingleBlogBySlug);
router.put("/:blogId/like", protectedRoute() ,toggleLike);

// Protected routes (Authors only)
router.use(protectedRoute(["Author"]));
router.get("/my-blogs",blogController.getMyBlogs);
router.post("/createBlog", blogLimiter, upload.single("blogCoverImage"), blogController.createBlog);
router.put("/:blogId", blogLimiter, upload.single("blogCoverImage"), blogController.updateBlog);
router.delete("/:blogId", blogLimiter, blogController.deleteBlog);
export default router;