import Donation from "../models/donation.model";

export const getAllDonations = async () => {
    return Donation.find().sort({ createdAt: -1 });
};

export const getAllDonationsWithDetails = async () => {
    return Donation.find()
        .populate('userId', 'firstName lastName email')
        .populate('projectId', 'title imageUrl')
        .sort({ createdAt: -1 });
};
