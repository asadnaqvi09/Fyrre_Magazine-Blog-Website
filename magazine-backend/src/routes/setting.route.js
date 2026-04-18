import express from "express";
import { getSettings, updateSettings } from "../controllers/setting.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/settings",
  protectedRoute(),
  authorize("Admin"),
  getSettings
);

router.put(
  "/updateSetting/:settingId",
  protectedRoute(),
  authorize("Admin"),
  updateSettings
);

export default router;;