import express from "express"

import {getUsers, createUser, loginUser, updateUserProfile} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateUserProfile);
// router.post("/forgot-password");

export default router;