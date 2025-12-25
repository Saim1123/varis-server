import { Request, Response } from "express";

import * as ProjectService from "../services/project.service";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getProjects();

        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: "No projects found" });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const project = await ProjectService.getProject(id);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await ProjectService.createProject(req.body, req.file);

        res.status(201).json({
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await ProjectService.updateProject(id, req.body, req.file);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteProjects = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "Array of project IDs is required" });
        }

        const result = await ProjectService.deleteProjects(ids);

        res.status(200).json({
            message: `${result.deletedCount} project(s) deleted successfully`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addExpense = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await ProjectService.addExpense(id, req.body);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({
            message: "Expense added successfully",
            project,
        });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const { id, expenseId } = req.params;
        const project = await ProjectService.deleteExpense(id, expenseId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({
            message: "Expense deleted successfully",
            project,
        });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};