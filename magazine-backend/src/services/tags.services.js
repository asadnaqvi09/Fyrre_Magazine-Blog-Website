import Tag from "../models/tags.model.js";
import ApiError from "../utilis/ApiError.js";

export const getAllTagsService = async (adminView = false) => {
  const filter = adminView ? {} : { isActive: true };
  return await Tag.find(filter).sort({ createdAt: -1 });
};

export const createTagService = async (data) => {
  const exists = await Tag.findOne({
    tagName: data.tagName.toLowerCase().trim()
  });
  if (exists) {
    throw new ApiError(400, "Tag already exists");
  }
  return await Tag.create({
    tagName: data.tagName,
    isActive: data.isActive ?? true
  });
};

export const updateTagService = async (tagId, data) => {
  const tag = await Tag.findByIdAndUpdate(
    tagId,
    {
      $set: {
        ...(data.tagName && { tagName: data.tagName }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    },
    { new: true, runValidators: true }
  );
  if (!tag) {
    throw new ApiError(404, "Tag not found");
  }
  return tag;
};

export const deleteTagService = async (tagId) => {
  const tag = await Tag.findByIdAndUpdate(
    tagId,
    { isActive: false },
    { new: true }
  );
  if (!tag) {
    throw new ApiError(404, "Tag not found");
  }
  return tag;
};