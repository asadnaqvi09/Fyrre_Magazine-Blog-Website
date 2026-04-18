import User from "../models/user.model.js";
import ApiError from "../utilis/ApiError.js";

export const fetchUsersServices = async () => {
  const users = await User.find()
    .select("userName email role isVerified isActive createdAt")
    .sort({ createdAt: -1 });
  
  if (!users || users.length === 0) throw new ApiError(404, "No users found");
  return users;
};

export const deleteUserServices = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  
  await User.findByIdAndDelete(userId);
  return { id: user._id, userName: user.userName, email: user.email, role: user.role };
};

export const getUserProfileServices = async (userId) => {
  const user = await User.findById(userId).select(
    "userName bio profileImage socialLinks createdAt role"
  );
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const updateUserProfileServices = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const allowedFields = ["userName", "bio", "socialLinks", "profileImage"];
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) user[field] = data[field];
  });

  await user.save();
  return user;
};