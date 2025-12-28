import mongoose from "mongoose";
import { Readable } from "stream";

import cloudinary from "../config/cloudinary";

import Project from "../models/project.model";

export const getProjects = async (category?: string) => {
    const filter = category ? { category } : {};
    return Project.find(filter).sort({ createdAt: -1 });
};

export const getProject = async (projectId: string) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) return null;

    return Project.findById(projectId);
};

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "projects",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result!.secure_url);
            }
        );

        Readable.from(file.buffer).pipe(uploadStream);
    });
};

export const createProject = async (data: any, file?: Express.Multer.File) => {
    if (file) {
        const imageUrl = await uploadImage(file);
        data.imageUrl = imageUrl;
    }
    return Project.create(data);
};

export const updateProject = async (projectId: string, data: any, file?: Express.Multer.File) => {
    if (file) {
        const imageUrl = await uploadImage(file);
        data.imageUrl = imageUrl;
    }

    return Project.findByIdAndUpdate(projectId, data, { new: true });
};

export const deleteProjects = async (projectIds: string[]) => {
    const result = await Project.deleteMany({ _id: { $in: projectIds } });
    return result;
};

export const addExpense = async (projectId: string, expenseData: any) => {
    return Project.findByIdAndUpdate(
        projectId,
        { $push: { expenses: expenseData } },
        { new: true, runValidators: true }
    );
};

export const deleteExpense = async (projectId: string, expenseId: string) => {
    return Project.findByIdAndUpdate(
        projectId,
        { $pull: { expenses: { _id: expenseId } } },
        { new: true }
    );
};