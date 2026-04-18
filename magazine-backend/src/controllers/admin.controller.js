import * as adminService from "../services/admin.services.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const fetchAllBlogs = async (req, res, next) => {
  try {
    const blogs = await adminService.fetchAllBlogsService(req.query.filter || {});
    res.status(200).json(new ApiResponse(200, { blogs }));
  } catch (err) {
    next(err);
  }
};

export const toggleBlogStatus = async (req, res, next) => {
  try {
    const blog = await adminService.toggleBlogStatusService(req.params.blogId, req.body.status);
    res.status(200).json(new ApiResponse(200, { blog }, `Blog status updated to ${req.body.status}`));
  } catch (err) {
    next(err);
  }
};

export const deleteBlogByAdmin = async (req, res, next) => {
  try {
    await adminService.deleteBlogService(req.params.blogId);
    res.status(200).json(new ApiResponse(200, null, "Blog deleted successfully by admin"));
  } catch (err) {
    next(err);
  }
};