import Blogs from "../models/blogs.model.js";
import ApiError from "../utilis/ApiError.js";

export const fetchAllBlogsService = async (filter = {}) => {
  return await Blogs.find(filter)
    .populate("blogAuthor", "userName email")
    .populate("blogCategory", "name")
    .sort({ createdAt: -1 });
};

export const toggleBlogStatusService = async (blogId, status) => {
  const blog = await Blogs.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  const validStatuses = ["draft", "published"];
  if (!validStatuses.includes(status)) throw new ApiError(400, "Invalid status");

  blog.blogStatus = status;
  if (status === "published") blog.publishedAt = new Date();
  
  await blog.save();
  return blog;
};

export const deleteBlogService = async (blogId) => {
  const blog = await Blogs.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");
  
  await Blogs.findByIdAndDelete(blogId);
  return true;
};