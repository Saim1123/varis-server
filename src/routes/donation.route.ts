import express from "express"

import { getDonations } from "../controllers/donation.controller";

const router = express.Router();

router.get("/", getDonations);

export default router;