import Category from "../models/category.model.js";
import ApiError from "../utilis/ApiError.js";

export const getAllCategoriesService = async (adminView = false) => {
  const filter = adminView ? {} : { isActive: true };
  return await Category.find(filter).sort({ createdAt: -1 });
};;

export const createCategoryService = async (data) => {
  const exists = await Category.findOne({
    categoryName: data.categoryName.toLowerCase()
  });
  if (exists) {
    throw new ApiError(400, "Category already exists");
  }
  const category = await Category.create({
    categoryName: data.categoryName,
    isActive: data.isActive ?? true
  });
  return category;
};

export const updateCategoryService = async (categoryId, data) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        ...(data.categoryName && { categoryName: data.categoryName }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    },
    { new: true, runValidators: true }
  );
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};

export const deleteCategoryService = async (categoryId) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    { isActive: false },
    { new: true }
  );
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};