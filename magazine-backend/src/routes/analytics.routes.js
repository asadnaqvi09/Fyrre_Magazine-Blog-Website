import express from "express";
import { protectedRoute } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/role.middleware.js';
import * as analyticsController from '../controllers/analytics.controller.js';

const router = express.Router();

router.post("/track/:blogId", analyticsController.TrackBlogViewController);
router.get("/admin", protectedRoute(), authorize('Admin'), analyticsController.AdminAnalyticsController);

export default router;