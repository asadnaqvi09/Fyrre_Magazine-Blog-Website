import * as blogServices from "../services/blog.services.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utilis/cloudinaryHelper.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const { page, limit, search, category, status, sortBy } = req.query;
    let queryFilters = { blogStatus: "published" };
    if (req.user?.role === "Admin") {
      if (status) {
        queryFilters.blogStatus = status;
      } else {
        delete queryFilters.blogStatus; 
      }
    }
    const result = await blogServices.getAllBlogsService(queryFilters, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 8,
      category,
      search,
      sortBy // latest, oldest, popular
    });
    res.status(200).json(
      new ApiResponse(200, result, "Blogs fetched successfully")
    );
  } catch (err) {
    next(err);
  }
};

export const getSingleBlogBySlug = async (req, res, next) => {
  try {
    const blog = await blogServices.getBlogBySlug(req.params.slug);
    res.status(200).json(new ApiResponse(200, { blog }));
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  let image;
  try {
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, "blogs/covers");
      req.body.blogCoverImage = image;
    }

    const blog = await blogServices.createBlog(
      req.user.userId,
      req.body
    );

    res.status(201).json(
      new ApiResponse(201, { blog }, "Blog published successfully")
    );
  } catch (err) {
    if (image?.public_id) await deleteFromCloudinary(image.public_id);
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  let newImage;
  try {
    if (req.file) {
      newImage = await uploadToCloudinary(req.file.buffer, "blogs/covers");
      req.body.blogCoverImage = newImage;
    }

    const blog = await blogServices.updateBlog(
      req.user.userId,
      req.params.blogId,
      req.body
    );

    res.status(200).json(
      new ApiResponse(200, { blog }, "Blog updated successfully")
    );
  } catch (err) {
    if (newImage?.public_id) await deleteFromCloudinary(newImage.public_id);
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await blogServices.deleteBlog(
      req.user.userId,
      req.params.blogId
    );

    res.status(200).json(
      new ApiResponse(200, null, "Blog deleted successfully")
    );
  } catch (err) {
    next(err);
  }
};

export const getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await blogServices.getAuthorBlogs(
      req.user.userId,
      req.query.status
    );

    res.status(200).json(new ApiResponse(200, { blogs }));
  } catch (err) {
    next(err);
  }
};;