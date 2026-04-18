import * as LikeService from "../services/like.services.js";
import ApiResponse from "../utilis/ApiResponse.js";

export const toggleLike = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.userId;
    const result = await LikeService.toggleBlogLikeService(blogId, userId);
    res.status(200).json(
      new ApiResponse(
        200, 
        result, 
        result.liked ? "Blog liked" : "Blog unliked"
      )
    );
  } catch (error) {
    next(error);
  }
};