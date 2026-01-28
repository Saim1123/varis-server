import express from "express"

import { getDonations, getAllDonationsAdmin, addDonation, updateDonationStatus, deleteDonations } from "../controllers/donation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { systemMiddleware } from "../middlewares/system.middleware";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", authMiddleware, getDonations);
router.get("/all", authMiddleware, adminMiddleware, getAllDonationsAdmin);
router.post("/", upload.single("screenshot"), addDonation);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateDonationStatus);
router.delete("/bulk", authMiddleware, systemMiddleware, deleteDonations);

export default router;