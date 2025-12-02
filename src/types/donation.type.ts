import mongoose from "mongoose";

export interface DonationInterface {
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    status: "active" | "inactive" | "pending";
    donorName: string;
    donorEmail: string;
    donorPhoneNumber: string;
    donorCountry: string;
    donorCity: string;
    donorAddress: string;
    message: string;
    isAnonymous: boolean;
    createdAt: Date;
}
