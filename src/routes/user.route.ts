import express from "express"

import { getUsers, createUser, loginUser, updateUserProfile, deleteUser, updateUserRole, validateToken, deleteUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { systemMiddleware } from "../middlewares/system.middleware";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/validate", authMiddleware, validateToken);
router.put("/profile", authMiddleware, updateUserProfile);
router.delete("/bulk", authMiddleware, systemMiddleware, deleteUsers);
router.delete("/:id", authMiddleware, systemMiddleware, deleteUser);
router.put("/:id/role", authMiddleware, systemMiddleware, updateUserRole);

export default router;