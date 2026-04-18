import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";

import { protectedRoute } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
const router = express.Router();

router.get(
  "/categories",
  protectedRoute(),
  authorize("Admin", "Author"),
  getCategories
);

router.post(
  "/createCategory",
  protectedRoute(),
  authorize("Admin"),
  createCategory
);

router.patch(
  "/updateCategory/:categoryId",
  protectedRoute(),
  authorize("Admin"),
  updateCategory
);

router.delete(
  "/deleteCategory/:categoryId",
  protectedRoute(),
  authorize("Admin"),
  deleteCategory
);

export default router;