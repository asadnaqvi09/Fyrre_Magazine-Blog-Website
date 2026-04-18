import Blog from "../models/blogs.model.js";
import ApiError from "../utilis/ApiError.js";
import slugify from "slugify";

const generateSlug = (title) => slugify(title, { lower: true, strict: true });

export const getAllBlogsService = async (filters = {}, options = {}) => {
  const { page = 1, limit = 8, category, search, sortBy } = options;
  const skip = (page - 1) * limit;
  let query = { ...filters };

  if (category) query.blogCategory = category;
  if (search) {
    query.$or = [
      { blogTitle: { $regex: search, $options: "i" } },
      { blogExcerpt: { $regex: search, $options: "i" } }
    ];
  }

  let sortQuery = { createdAt: -1 };

  switch (sortBy) {
    case "oldest":
      sortQuery = { createdAt: 1 };
      break;
    case "popular":
      sortQuery = { blogViews: -1 };
      break;
    case "latest":
    default:
      sortQuery = { createdAt: -1 };
      break;
  }

  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .populate("blogAuthor", "userName profileImage")
      .populate("blogCategory", "name")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit),
    Blog.countDocuments(query)
  ]);

  return {
    blogs,
    pagination: {
      totalBlogs: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOneAndUpdate(
    { blogSlug: slug, blogStatus: "published" },
    { $inc: { blogViews: 1 } },
    { new: true }
  )
    .populate("blogAuthor", "userName bio profileImage")
    .populate("blogCategory", "name");

  if (!blog) throw new ApiError(404, "Blog not found");
  return blog;
};

export const createBlog = async (authorId, data) => {
  const slug = generateSlug(data.blogTitle);
  const exists = await Blog.findOne({ blogSlug: slug });
  if (exists) throw new ApiError(409, "Blog title already exists");

  return Blog.create({
    ...data,
    blogSlug: slug,
    blogAuthor: authorId,
    publishedAt: data.blogStatus === "published" ? new Date() : null
  });
};

export const updateBlog = async (authorId, blogId, data) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  if (data.blogTitle && data.blogTitle !== blog.blogTitle) {
    const newSlug = generateSlug(data.blogTitle);
    const exists = await Blog.findOne({ blogSlug: newSlug, _id: { $ne: blogId } });
    if (exists) throw new ApiError(409, "Blog title already exists");
    blog.blogSlug = newSlug;
    blog.blogTitle = data.blogTitle;
  }

  const fields = ["blogContent", "blogExcerpt", "blogCategory", "blogTags", "blogCoverImage", "blogReadTime", "blogStatus"];
  fields.forEach(f => {
    if (data[f] !== undefined) blog[f] = data[f];
  });

  if (data.blogStatus === "published" && !blog.publishedAt) {
    blog.publishedAt = new Date();
  }

  await blog.save();
  return blog;
};

export const deleteBlog = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  await blog.deleteOne();
  return true;
};