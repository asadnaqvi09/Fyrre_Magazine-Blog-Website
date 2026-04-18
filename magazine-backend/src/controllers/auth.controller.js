import * as authService from '../services/auth.services.js';
import ApiResponse from '../utilis/ApiResponse.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerService(req.body);
    res.status(201).json(new ApiResponse(201, { user }, 'Registration successful. Please verify your email.'));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await authService.loginService(req.body);
    res.status(200).json(new ApiResponse(200, { 
      user: data.user, 
      accessToken: data.accessToken, 
      refreshToken: data.refreshToken 
    }, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    await authService.logoutService(refreshToken);
    res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.userId);
    res.status(200).json(new ApiResponse(200, { user }));
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const data = await authService.refreshAccessToken(refreshToken);
    res.status(200).json(new ApiResponse(200, data, 'Access token refreshed'));
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const data = await authService.verifyEmail(token);
    res.status(200).json(new ApiResponse(200, data));
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const verificationLink = await authService.resendVerificationEmail(req.user);
    res.status(200).json(new ApiResponse(200, { verificationLink }, 'Verification email sent'));
  } catch (error) {
    next(error);
  }
};