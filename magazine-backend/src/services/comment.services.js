import Comment from "../models/comment.model.js";
import ApiError from "../utilis/ApiError.js";

const buildCommentTree = (comments, parentId = null) => {
  const tree = [];
  comments
    .filter((c) => String(c.parentComment) === String(parentId))
    .forEach((c) => {
      const children = buildCommentTree(comments, c._id);
      if (children.length > 0) {
        c._doc.replies = children;
      } else {
        c._doc.replies = [];
      }
      tree.push(c);
    });
  return tree;
};

export const addCommentService = async (blogId, userId, content, parentId = null) => {
  if (parentId) {
    const parent = await Comment.findById(parentId);
    if (!parent) throw new ApiError(404, "Parent comment not found");
  }

  return await Comment.create({
    blogId,
    userId,
    content,
    parentComment: parentId
  });
};

export const getBlogCommentsService = async (blogId) => {
  const allComments = await Comment.find({ blogId })
    .populate("userId", "userName profileImage")
    .sort({ createdAt: 1 });

  return buildCommentTree(allComments);
};

export const deleteCommentService = async (commentId, userId, userRole) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.userId.toString() !== userId && userRole !== "Admin") {
    throw new ApiError(403, "Not authorized to delete this comment");
  }

  const deleteRecursive = async (pid) => {
    const children = await Comment.find({ parentComment: pid });
    for (let child of children) {
      await deleteRecursive(child._id);
    }
    await Comment.findByIdAndDelete(pid);
  };

  await deleteRecursive(commentId);
  return true;
};