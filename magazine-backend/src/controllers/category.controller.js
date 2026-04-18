import * as categoryService from "../services/category.services.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const getCategories = async (req, res, next) => {
  try {
    const adminView = req.user.role === "Admin";
    const categories = await categoryService.getAllCategoriesService(adminView);
    res.status(200).json(
      new ApiResponse(200, { categories }, "Categories fetched successfully")
    );
  } catch (err) {
    next(err);
  }
};;

export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategoryService(req.body);
    res.status(201).json(
      new ApiResponse(201, { category }, "Category created successfully")
    );
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategoryService(
      req.params.categoryId,
      req.body
    );
    res.status(200).json(
      new ApiResponse(200, { category }, "Category updated successfully")
    );
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategoryService(
      req.params.categoryId
    );
    res.status(200).json(
      new ApiResponse(200, { category }, "Category deleted successfully")
    );
  } catch (err) {
    next(err);
  }
};
