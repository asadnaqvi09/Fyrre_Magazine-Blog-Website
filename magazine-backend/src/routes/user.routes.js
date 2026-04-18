import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as adminController from "../controllers/admin.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/author/:authorId", userController.getAuthorProfile);
router.get("/authors", userController.fetchAuthor);

router.use(protectedRoute());

router.get("/all_users", authorize("Admin"), userController.fetchUser);
router.delete("/:userId", authorize("Admin"), userController.deleteUser);
router.patch("/promote/:userId", authorize("Admin"), userController.promoteToAuthor);
router.patch("/revoke/:userId", authorize("Admin"), userController.revokeAuthor);

router.get("/blogs", authorize("Admin"), adminController.fetchAllBlogs);

router.patch(
  "/author/me",
  authorize("Author", "Admin"),
  upload.single("profileImage"),
  userController.updateAuthorProfile
);

export default router;