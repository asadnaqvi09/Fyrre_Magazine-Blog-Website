import User from "../models/user.model.js";
import * as userServices from "../services/user.services.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utilis/cloudinaryHelper.js";
import ApiResponse from "../utilis/ApiResponse.js";
import ApiError from "../utilis/ApiError.js";

export const fetchUser = async (req, res, next) => {
  try {
    const users = await userServices.fetchUsersServices();
    res.status(200).json(new ApiResponse(200, { users }));
  } catch (err) {
    next(err);
  }
};

export const fetchAuthor = async (req, res, next) => {
  try {
    const authors = await userServices.fetchAuthorsServices();
    res.status(200).json(new ApiResponse(200, { authors }));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const users = await userServices.deleteUserServices(req.params.userId);
    res.status(200).json(new ApiResponse(200, { users }));
  } catch (err) {
    next(err);
  }
};

export const promoteToAuthor = async (req, res, next) => {
  try {
    const user = await userServices.promoteToAuthorServices(req.user.userId, req.params.userId);
    res.status(200).json(new ApiResponse(200, { user }));
  } catch (err) {
    next(err);
  }
};

export const revokeAuthor = async (req, res, next) => {
  try {
    const user = await userServices.removeAuthorServices(req.user.userId, req.params.userId);
    res.status(200).json(new ApiResponse(200, { user }));
  } catch (err) {
    next(err);
  }
};

export const getAuthorProfile = async (req, res, next) => {
  try {
    const author = await userServices.getAuthorProfileServices(req.params.authorId);
    res.status(200).json(new ApiResponse(200, { author }));
  } catch (err) {
    next(err);
  }
};

export const updateAuthorProfile = async (req, res, next) => {
  let newImage;
  let oldImagePublicId;

  try {
    const authorId = req.user.userId;
    const author = await User.findById(authorId);
    if (!author) throw new ApiError(404, "Author Not Found");

    if (req.file) {
      oldImagePublicId = author.profileImage?.public_id;
      newImage = await uploadToCloudinary(req.file.buffer, "authors/profile");
      req.body.profileImage = newImage;
    }

    const updatedAuthor = await userServices.updateAuthorProfileServices(authorId, req.body);

    if (oldImagePublicId) await deleteFromCloudinary(oldImagePublicId);

    res.status(200).json(new ApiResponse(200, { author: updatedAuthor }));
  } catch (err) {
    if (newImage?.public_id) await deleteFromCloudinary(newImage.public_id);
    next(err);
  }
};