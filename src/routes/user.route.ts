import express from "express"

import {getUsers, createUser, loginUser, updateUserProfile, deleteUser, updateUserRole, validateToken} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {adminMiddleware} from "../middlewares/admin.middleware";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/validate", authMiddleware, validateToken);
router.put("/profile", authMiddleware, updateUserProfile);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);
router.put("/:id/role", authMiddleware, adminMiddleware, updateUserRole);

export default router;