import express from "express"

import { getProjects, getProject, createProject, deleteProjects, updateProject, addExpense, deleteExpense } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { systemMiddleware } from "../middlewares/system.middleware";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", authMiddleware, adminMiddleware, upload.array("images", 5), createProject);
router.put("/:id", authMiddleware, adminMiddleware, upload.array("images", 5), updateProject);
router.delete("/bulk", authMiddleware, systemMiddleware, deleteProjects);

router.post("/:id/expenses", authMiddleware, adminMiddleware, addExpense);
router.delete("/:id/expenses/:expenseId", authMiddleware, systemMiddleware, deleteExpense);

export default router;