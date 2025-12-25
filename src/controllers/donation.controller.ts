import { Request, Response } from "express";

import * as DonationService from "../services/donation.service";
import * as CloudinaryService from "../services/cloudinary.service";

export const getDonations = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const donations = await DonationService.getUserDonations(userId);

        if (donations.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(donations);
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllDonationsAdmin = async (_req: Request, res: Response) => {
    try {
        const donations = await DonationService.getAllDonationsWithDetails();

        res.status(200).json(donations);
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addDonation = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Screenshot is required" });
        }

        const screenshotUrl = await CloudinaryService.uploadImage(file);

        const {
            amount,
            paymentMethod,
            firstName,
            lastName,
            email,
            phoneNumber,
            userId,
            projectId,
        } = req.body;

        if (!amount || !paymentMethod) {
            return res.status(400).json({ error: "Amount and payment method are required" });
        }

        const donationData = {
            amount: Number(amount),
            paymentMethod,
            screenshotUrl,
            donorName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
            donorEmail: email,
            donorPhoneNumber: phoneNumber,
            userId: userId || undefined,
            projectId: projectId || undefined,
        };

        const donation = await DonationService.createDonation(donationData);

        res.status(201).json({
            message: "Donation submitted successfully",
            donation,
        });
    } catch (error) {
        console.error("Error adding donation:", error);
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateDonationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !["pending", "active", "inactive"].includes(status)) {
            return res.status(400).json({ error: "Valid status is required (pending, active, inactive)" });
        }

        const donation = await DonationService.updateDonationStatus(id, status);

        res.status(200).json({
            message: "Donation status updated successfully",
            donation,
        });
    } catch (error) {
        console.error("Error updating donation status:", error);
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteDonations = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "Array of donation IDs is required" });
        }

        const result = await DonationService.deleteDonations(ids);

        res.status(200).json({
            message: `${result.deletedCount} donation(s) deleted successfully`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting donations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};