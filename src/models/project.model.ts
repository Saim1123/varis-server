import mongoose from "mongoose"

import { ProjectInterface } from "../types/project.type";

const ProjectSchema = new mongoose.Schema<ProjectInterface>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    collectedAmount: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
    expenses: [{
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
})

const Project = mongoose.model("Project", ProjectSchema);
export default Project;