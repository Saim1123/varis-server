import mongoose from "mongoose";


export interface Expense {
    _id?: string;
    description: string;
    amount: number;
    date: Date;
}

export interface ProjectInterface {
    title: string;
    description: string;
    category: string;
    targetAmount: number;
    collectedAmount: number;
    imageUrl: string;
    status: "active" | "inactive" | "pending";
    donations: mongoose.Types.ObjectId[];
    expenses: Expense[];
    createdAt: Date;
}
