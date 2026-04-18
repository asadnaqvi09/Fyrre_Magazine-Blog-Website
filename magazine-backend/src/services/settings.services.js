import Setting from "../models/settings.model.js";
import ApiError from "../utilis/ApiError.js";

export const createSettingService = async (adminId) => {
  let setting = await Setting.findOne();

  if (!setting) {
    setting = await Setting.create({
      siteTitle: "Fyrre Magazine",
      siteDescription: "Modern Digital Magazine",
      siteEmail: adminId
    });
  }

  return setting;
};

export const updateSettingService = async (data, adminId) => {
  const settings = await Setting.findOne();
  if (!settings) throw new ApiError(404, "Settings not found");

  if (data.siteTitle !== undefined) {
    settings.siteTitle = data.siteTitle;
  }

  if (data.siteDescription !== undefined) {
    settings.siteDescription = data.siteDescription;
  }

  settings.siteEmail = adminId;

  await settings.save();
  return settings;
};