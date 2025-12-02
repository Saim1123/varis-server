import Donation from "../models/donation.model";

export const getAllDonations = async () => {
    return Donation.find().sort({ createdAt: -1 });
};
