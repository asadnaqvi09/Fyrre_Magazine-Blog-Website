import Like from "../models/like.model.js";
import Blog from "../models/blogs.model.js";
import ApiError from "../utilis/ApiError.js";

export const toggleBlogLikeService = async (blogId, userId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  const existingLike = await Like.findOne({ blogId, userId });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    blog.blogLikes = blog.blogLikes.filter(id => id.toString() !== existingLike._id.toString());
    await blog.save();
    return { liked: false };
  }

  const newLike = await Like.create({ blogId, userId });
  blog.blogLikes.push(newLike._id);
  await blog.save();
  return { liked: true };
};