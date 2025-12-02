import { Request, Response } from "express";

import * as DonationService from "../services/donation.service";

export const getDonations = async (req: Request, res: Response) => {
    try {
        const donations = await DonationService.getAllDonations();

        if (donations.length === 0) {
            return res.status(404).json({ error: "No donations found" });
        }

        res.status(200).json(donations);
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};