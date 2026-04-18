import ApiResponse from "../utilis/ApiResponse.js";
import {
  createSettingService,
  updateSettingService
} from "../services/settings.services.js";

export const getSettings = async (req, res, next) => {
  try {
    const settings = await createSettingService(req.user?._id);
    res.status(200).json(new ApiResponse(200, settings));
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await updateSettingService(req.body, req.user._id);
    res.status(200).json(new ApiResponse(200, settings, "Settings updated"));
  } catch (error) {
    next(error);
  }
};