import mongoose from "mongoose";

export enum ProjectCategory {
    TREES = "Trees",
    EDUCATION = "Education",
    AGRICULTURE = "Agriculture",
    ANIMAL_FARMING = "Animal Farming",
    PLANTATION = "Plantation"
}

export interface Expense {
    _id?: string;
    description: string;
    amount: number;
    date: Date;
}

export interface ProjectInterface {
    title: string;
    description: string;
    category: ProjectCategory;
    targetAmount: number;
    collectedAmount: number;
    imageUrls: string[];
    imageUrl?: string;
    status: "active" | "inactive" | "pending";
    donations: mongoose.Types.ObjectId[];
    expenses: Expense[];
    createdAt: Date;
}
