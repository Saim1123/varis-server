import mongoose from "mongoose";

import { DonationInterface } from "../types/donation.type";

const DonationSchema = new mongoose.Schema<DonationInterface>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, default: "pending" },
    donorName: { type: String },
    donorEmail: { type: String },
    donorPhoneNumber: { type: String },
    donorCountry: { type: String },
    donorCity: { type: String },
    donorAddress: { type: String },
    message: { type: String, default: "" },
    isAnonymous: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;