import { Request, Response } from "express";

import * as UserService from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();

        if (users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, role } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = await UserService.createUser({ firstName, lastName, email, phoneNumber, password, role })

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await UserService.loginUser({ email, password });

        if (result === null) {
            return res.status(404).json({ error: "Invalid email or password" });
        }

        if (result === false) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error("Error login user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { country, city, address } = req.body;

        if (!country && !city && !address) {
            return res.status(400).json({ error: "At least one field (country, city, or address) is required" });
        }

        const updateData: any = {};
        if (country !== undefined) updateData.country = country;
        if (city !== undefined) updateData.city = city;
        if (address !== undefined) updateData.address = address;

        const updatedUser = await UserService.updateUserProfile(userId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}