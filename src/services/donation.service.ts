import Donation from "../models/donation.model";
import Project from "../models/project.model";
import { DonationInterface } from "../types/donation.type";

export const getAllDonations = async () => {
    return Donation.find().sort({ createdAt: -1 });
};

export const getUserDonations = async (userId: string) => {
    return Donation.find({ userId })
        .populate('projectId', 'title imageUrl')
        .sort({ createdAt: -1 });
};

export const getAllDonationsWithDetails = async () => {
    return Donation.find()
        .populate('userId', 'firstName lastName email')
        .populate('projectId', 'title imageUrl')
        .sort({ createdAt: -1 });
};

export const createDonation = async (donationData: Partial<DonationInterface>) => {
    const donation = new Donation(donationData);
    return donation.save();
};

export const updateDonationStatus = async (donationId: string, status: string) => {
    const donation = await Donation.findById(donationId);

    if (!donation) {
        throw new Error("Donation not found");
    }

    const previousStatus = donation.status;
    donation.status = status as "active" | "inactive" | "pending";
    await donation.save();

    if (status === "active" && previousStatus !== "active" && donation.projectId) {
        await Project.findByIdAndUpdate(
            donation.projectId,
            { $inc: { collectedAmount: donation.amount } }
        );
    }

    if (previousStatus === "active" && status !== "active" && donation.projectId) {
        await Project.findByIdAndUpdate(
            donation.projectId,
            { $inc: { collectedAmount: -donation.amount } }
        );
    }

    return donation;
};

export const deleteDonations = async (donationIds: string[]) => {
    const activeDonations = await Donation.find({
        _id: { $in: donationIds },
        status: "active",
        projectId: { $exists: true, $ne: null }
    });

    for (const donation of activeDonations) {
        await Project.findByIdAndUpdate(
            donation.projectId,
            { $inc: { collectedAmount: -donation.amount } }
        );
    }

    const result = await Donation.deleteMany({ _id: { $in: donationIds } });
    return result;
};