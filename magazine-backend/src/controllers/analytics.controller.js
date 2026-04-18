import * as AnalyticsService from '../services/analytics.services.js';
import ApiResponse from '../utilis/ApiResponse.js';

export const TrackBlogViewController = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const userId = req.user?.userId || null;
    const ipAddress = req.ip;

    await AnalyticsService.TrackBlogViewServices({
      blogId,
      userId,
      ipAddress,
    });

    res.status(200).json(new ApiResponse(200, null, "View tracked"));
  } catch (error) {
    next(error);
  }
};

export const AdminAnalyticsController = async (req, res, next) => {
  try {
    const analytics = await AnalyticsService.getAdminAnalyticsServices();
    res.status(200).json(new ApiResponse(200, analytics, "Analytics fetched"));
  } catch (error) {
    next(error);
  }
};