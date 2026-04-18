import { Router } from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/rate_limiter.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authLimiter, authController.registerUser);
router.post('/login', authLimiter, authController.loginUser);
router.post('/logout', protectedRoute(), authController.logoutUser);
router.get('/profile', protectedRoute(), authController.getProfile);
router.post('/refresh-token', authLimiter, authController.refreshToken);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', protectedRoute(), authLimiter, authController.resendVerificationEmail);

export default router;