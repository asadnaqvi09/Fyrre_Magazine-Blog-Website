import ApiError from '../utilis/ApiError.js';

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: Insufficient permissions'));
    }
    next();
  };

export default authorize;