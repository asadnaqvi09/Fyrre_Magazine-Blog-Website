import * as CommentService from "../services/comment.services.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const postComment = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user.userId;

    const comment = await CommentService.addCommentService(blogId, userId, content, parentId);
    res.status(201).json(new ApiResponse(201, comment, "Comment added"));
  } catch (error) {
    next(error);
  }
};

export const fetchComments = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const comments = await CommentService.getBlogCommentsService(blogId);
    res.status(200).json(new ApiResponse(200, comments, "Comments fetched"));
  } catch (error) {
    next(error);
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await CommentService.deleteCommentService(commentId, req.user.userId, req.user.role);
    res.status(200).json(new ApiResponse(200, null, "Comment deleted"));
  } catch (error) {
    next(error);
  }
};