import express from "express"

import {getUsers, createUser, loginUser} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
// router.post("/forgot-password");

export default router;