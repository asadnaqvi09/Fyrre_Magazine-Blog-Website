import User from '../models/user.model.js';
import TokenModel from '../models/token.model.js';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utilis/authHelper.js';
import ApiError from '../utilis/ApiError.js';
import sendEmail from '../utilis/sendEmail.js';

export const registerService = async ({ userName, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, 'Email already registered. Please login.');
  const user = await User.create({ userName, email, password, role: 'User' });
  await TokenModel.deleteMany({ user: user._id, type: 'verify-email' });
  const verifyToken = crypto.randomBytes(32).toString('hex');
  await TokenModel.create({
    user: user._id,
    token: verifyToken,
    type: 'verify-email',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
  const verificationLink = `http://localhost:3000/auth/verify-email?token=${verifyToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Verify Your Email',
    html: `<p>Welcome!</p><p>Click the link to verify your email:</p><a href="${verificationLink}">Verify Email</a>`
  });
  return user;
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid email or password');
  if (!user.isActive) throw new ApiError(403, 'Your account is disabled.');
  if (!user.isVerified) throw new ApiError(403, 'Please verify your email before logging in');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');
  await TokenModel.deleteMany({ user: user._id, type: 'refresh' });
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  return {
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  };
};

export const logoutService = async refreshToken => {
  if (!refreshToken) throw new ApiError(400, 'Refresh token is required');
  await TokenModel.findOneAndDelete({ token: refreshToken, type: 'refresh' });
};

export const getUserProfile = async userId => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const refreshAccessToken = async refreshToken => {
  if (!refreshToken) throw new ApiError(400, 'Refresh token required');
  const storedToken = await TokenModel.findOne({ token: refreshToken, type: 'refresh' });
  if (!storedToken || storedToken.expiresAt < new Date()) {
    if (storedToken) await storedToken.deleteOne();
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
  const user = await User.findById(storedToken.user);
  if (!user || !user.isActive) throw new ApiError(401, 'User not found or inactive');
  const accessToken = generateAccessToken(user);
  return { 
    accessToken, 
    user: { id: user._id, userName: user.userName, email: user.email, role: user.role } 
  };
};

export const verifyEmail = async token => {
  const storedToken = await TokenModel.findOne({ token, type: 'verify-email' });
  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new ApiError(400, 'Invalid or expired verification token');
  }
  const user = await User.findById(storedToken.user);
  if (!user) throw new ApiError(404, 'User not found');
  user.isVerified = true;
  await user.save();
  await storedToken.deleteOne();
  return { message: 'Email verified successfully' };
};

export const resendVerificationEmail = async user => {
  await TokenModel.deleteMany({ user: user._id, type: 'verify-email' });
  const verifyToken = crypto.randomBytes(32).toString('hex');
  await TokenModel.create({
    user: user._id,
    token: verifyToken,
    type: 'verify-email',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
  const verificationLink = `http://localhost:3000/auth/verify-email?token=${verifyToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Resend Email Verification',
    html: `<p>Click the link to verify your email:</p><a href="${verificationLink}">Verify Email</a>`
  });
  return verificationLink;
};