import jwt from 'jsonwebtoken';
import ApiError from '../utilis/ApiError.js';

export const protectedRoute = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new ApiError(401, 'Access token missing');
      const [scheme, token] = authHeader.split(' ');
      if (scheme !== 'Bearer' || !token) {
        throw new ApiError(401, 'Invalid authorization format');
      }
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      };
      if (roles.length && !roles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden: insufficient permissions');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};