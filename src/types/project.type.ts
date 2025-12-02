import mongoose from "mongoose";

export interface ProjectInterface {
    title: string;
    description: string;
    category: string;
    targetAmount: number;
    collectedAmount: number;
    imageUrl: string;
    status: "active" | "inactive" | "pending";
    donations: mongoose.Types.ObjectId[];
    createdAt: Date;
}
