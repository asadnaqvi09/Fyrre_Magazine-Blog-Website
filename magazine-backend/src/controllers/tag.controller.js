import * as tagService from "../services/tags.services.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const getTags = async (req, res, next) => {
  try {
    const adminView = req.user.role === "Admin";
    const tags = await tagService.getAllTagsService(adminView);
    res
      .status(200)
      .json(new ApiResponse(200, { tags }, "Tags fetched successfully"));
  } catch (err) {
    next(err);
  }
};;

export const createTag = async (req, res, next) => {
  try {
    const tag = await tagService.createTagService(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, { tag }, "Tag created successfully"));
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await tagService.updateTagService(
      req.params.tagId,
      req.body
    );
    res
      .status(200)
      .json(new ApiResponse(200, { tag }, "Tag updated successfully"));
  } catch (err) {
    next(err);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await tagService.deleteTagService(req.params.tagId);
    res
      .status(200)
      .json(new ApiResponse(200, { tag }, "Tag deleted successfully"));
  } catch (err) {
    next(err);
  }
};
