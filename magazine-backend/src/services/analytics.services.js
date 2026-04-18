import Analytics from "../models/analytics.model.js";
import Blogs from "../models/blogs.model.js";

export const TrackBlogViewServices = async ({ blogId, userId = null, ipAddress = null }) => {
  try {
    const filter = userId 
      ? { blog: blogId, user: userId, viewerType: "User" } 
      : { blog: blogId, ipAddress, viewerType: "Guest" };

    const update = userId 
      ? { blog: blogId, user: userId, viewerType: "User" } 
      : { blog: blogId, ipAddress, viewerType: "Guest" };

    return await Analytics.findOneAndUpdate(filter, update, { upsert: true, new: true });
  } catch (error) {
    if (error.code === 11000) return null;
    throw error;
  }
};

export const getAdminAnalyticsServices = async () => {
  const [totalViews, viewerSplit, topBlogs] = await Promise.all([
    Analytics.countDocuments(),
    Analytics.aggregate([
      { $group: { _id: "$viewerType", count: { $sum: 1 } } }
    ]),
    Analytics.aggregate([
      { $group: { _id: "$blog", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "_id",
          as: "blogDetails"
        }
      },
      { $unwind: "$blogDetails" },
      { $project: { views: 1, title: "$blogDetails.blogTitle" } }
    ])
  ]);

  return { totalViews, viewerSplit, topBlogs };
};