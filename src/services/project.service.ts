import mongoose from "mongoose";

import Project from "../models/project.model";

export const getProjects = async () => {
    return Project.find().sort({ createdAt: -1 });
};

export const getProject = async (projectId: string) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) return null;

    return Project.findById(projectId);
};

export const createProject = async (data: any) => {
    return Project.create(data);
};