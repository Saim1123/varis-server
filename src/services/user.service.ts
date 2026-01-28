import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import { config } from "../config/env";

type UserData = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number | string,
  password: string
}

export const getAllUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

export const createUser = async (userData: UserData & { googleId?: string; authProvider?: 'local' | 'google' }) => {
  // Only hash password if it's provided (not for Google OAuth users)
  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  }

  const newUser = new User(userData);
  return await newUser.save();
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    return null;
  }

  // Skip password check for Google OAuth users
  if (user.authProvider === 'google') {
    return false; // Google users should use Google login
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    return false;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "10h" },
  );

  const userObj = user.toObject();
  Reflect.deleteProperty(userObj, "password");
  Reflect.deleteProperty(userObj, "createdAt");

  return { token, user: userObj };
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select("-password -createdAt");
  return user;
};

export const updateUserProfile = async (
  userId: string,
  updateData: { country?: string; city?: string; address?: string; googleId?: string; authProvider?: 'local' | 'google' },
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  ).select("-password -createdAt");

  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

export const updateUserRole = async (
  userId: string,
  role: "admin" | "user",
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true, runValidators: true },
  ).select("-password -createdAt");

  return user;
};

export const deleteUsers = async (userIds: string[]) => {
  const result = await User.deleteMany({ _id: { $in: userIds } });
  return result;
};
