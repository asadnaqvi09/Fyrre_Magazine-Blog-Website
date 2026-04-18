import api from "../api/axios";

export const getCategories = async () => {
  const response = await api.get("/category/categories");
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/category/createCategory", categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.patch(`/category/updateCategory/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/category/deleteCategory/${id}`);
  return response.data;
};