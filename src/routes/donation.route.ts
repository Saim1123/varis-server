import express from "express"

import { getDonations, getAllDonationsAdmin } from "../controllers/donation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = express.Router();

router.get("/", getDonations);
router.get("/all", authMiddleware, adminMiddleware, getAllDonationsAdmin);

export default router;