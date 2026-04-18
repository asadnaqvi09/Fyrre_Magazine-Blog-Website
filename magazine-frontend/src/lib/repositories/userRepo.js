import api from "../api/axios";

export const fetchAllUsersApi = () => api.get("/user/all_users");
export const deleteUserApi = (userId) => api.delete(`/user/${userId}`);
export const promoteToAuthorApi = (userId) => api.patch(`/user/promote/${userId}`);
export const revokeAuthorApi = (userId) => api.patch(`/user/revoke/${userId}`);
export const fetchAdminBlogsApi = (filter) => api.get("/user/blogs", { params: filter });
export const approveBlogApi = (blogId) => api.put(`/user/blogs/${blogId}/approve`);
export const rejectBlogApi = (blogId, reason) => api.put(`/user/blogs/${blogId}/reject`, { reason });

// Author & Public Actions
export const fetchAuthorsApi = () => api.get("/user/authors");
export const getAuthorProfileApi = (authorId) => api.get(`/user/author/${authorId}`);
export const updateAuthorProfileApi = (formData) => api.patch("/user/author/me", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});