import express from "express"

import { getProjects, getProject, createProject } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", authMiddleware, adminMiddleware, createProject)

export default router;