import rateLimit from 'express-rate-limit';

const globalRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false },
    message: {
        status: 429,
        message: "Too many requests. Please try again later."
    }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Har IP se 15 mins mein sirf 20 requests
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
  message: {
    status: 429,
    message: "Too many attempts, please try again after 15 minutes"
  },
  // Validation errors ko khatam karne ke liye ye settings zaroori hain
  validate: {
    ip: true,
    trustProxy: false // Agar aap local development par hain toh isay false rakhein
  }
});

const blogLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 50,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Action limit exceeded, please try again later"
  },
  validate: {
    ip: true
  }
});

const uploadRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.user?.userId || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, message: "Too many uploads. Please wait before trying again." }
});

export { globalRateLimiter, authLimiter, blogLimiter, uploadRateLimiter };