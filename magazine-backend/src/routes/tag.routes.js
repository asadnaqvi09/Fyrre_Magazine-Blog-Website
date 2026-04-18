import express from "express";
import {
    getTags,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
    "/all_tags",
    protectedRoute(),
    authorize("Admin", "Author"),
    getTags
);

router.post(
    "/createTag",
    protectedRoute(),
    authorize("Admin"),
    createTag
);

router.patch(
    "/updateTag/:tagId",
    protectedRoute(),
    authorize("Admin"),
    updateTag
);

router.delete(
    "/deleteTag/:tagId",
    protectedRoute(),
    authorize("Admin"),
    deleteTag
);

export default router;