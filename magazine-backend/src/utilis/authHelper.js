import jwt from 'jsonwebtoken';
import Token from '../models/token.model.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = async (user) => {
  const expiresInDays = 2;
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${expiresInDays}d` }
  );
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);
  await Token.create({
    user: user._id,
    token,
    type: 'refresh',
    expiresAt
  });
  return token;
};