import api from "../api/axios";

export const trackBlogView = async (blogId) => {
  const response = await api.post("/analytics/track/${blogId}");
  return response.data;
};

export const fetchAdminAnalytics = async () => {
  const response = await api.get("/analytics/admin");
  return response.data.data;
};

export const fetchAuthorAnalytics = async () => {
  const response = await api.get("/analytics/author");
  return response.data.data;
};