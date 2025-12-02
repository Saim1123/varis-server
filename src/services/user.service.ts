import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model";
import {config} from "../config/env";

export const getAllUsers = async () => {
    return User.find().sort({ createdAt: -1 });
};

export const createUser = async (userData: any) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = new User(userData);
    return await newUser.save();
}

export const loginUser = async (userData: any) => {
    const user = await User.findOne({ email: userData.email })
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(userData.password, user.password)
    if (!isMatch) {
        return false;
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: "10h" });

    const userObj = user.toObject();
    Reflect.deleteProperty(userObj, "password");
    Reflect.deleteProperty(userObj, "createdAt");

    return { token, user: userObj }
}

export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({ email })
    return user;
}