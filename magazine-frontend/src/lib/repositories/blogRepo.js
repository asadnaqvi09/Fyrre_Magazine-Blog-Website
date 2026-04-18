import api from "../api/axios";

export const fetchAllBlogs = async (params) => {
  // params: { page, limit, search, category, status }
  const response = await api.get(`/blog/blogs`, { params });
  return response.data;
};

export const fetchBlogBySlug = async (slug) => {
  const response = await api.get(`/blog/${slug}`);
  return response.data;
};

export const fetchMyBlogs = async (status) => {
  const response = await api.get(`/blog/my-blogs`, { params: { status } });
  return response.data;
};

export const createBlogApi = async (formData) => {
  const response = await api.post(`/blog/createBlog`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlogApi = async (blogId, formData) => {
  const response = await api.put(`/blog/blogs/${blogId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlogApi = async (blogId) => {
  const response = await api.delete(`/blog/blogs/${blogId}`);
  return response.data;
};