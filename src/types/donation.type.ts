import mongoose from "mongoose";

export interface TreesDonationPlan {
    careType: "3_months" | "lifetime";
    quantity: number;
    unitPrice: number;
}

export interface EducationDonationPlan {
    duration: "monthly" | "yearly" | "one_time";
    planType: "educate_child" | "back_to_school" | "sponsor_classroom" | "support_school";
    count: number;
    unitPrice: number;
}

export interface AgricultureDonationPlan {
    duration: "one_time" | "monthly" | "yearly";
    planType: "seeds" | "crops" | "tools" | "irrigation";
    count: number;
    unitPrice: number;
}

export interface AnimalFarmingDonationPlan {
    duration: "one_time" | "monthly" | "yearly";
    planType: "feed" | "medical" | "livestock" | "sponsor";
    count: number;
    unitPrice: number;
}

export interface PlantationDonationPlan {
    duration: "one_time" | "monthly" | "yearly";
    planType: "plant_tree" | "green_pakistan" | "adopt_tree" | "community";
    count: number;
    unitPrice: number;
}

export interface WaterFiltrationDonationPlan {
    duration: "one_time" | "monthly" | "yearly";
    planType: "water_boring" | "hand_pump" | "water_filter_plant" | "home_filter_units" | "water_maintenance";
    count: number;
    unitPrice: number;
}

export interface DonationInterface {
    userId?: mongoose.Types.ObjectId;
    projectId?: mongoose.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    transactionId?: string;
    screenshotUrl: string;
    status: "active" | "inactive" | "pending";
    donorName?: string;
    donorEmail?: string;
    donorPhoneNumber?: string;
    donorCountry?: string;
    donorCity?: string;
    donorAddress?: string;
    message?: string;
    isAnonymous?: boolean;
    donationPlan?: TreesDonationPlan | EducationDonationPlan | AgricultureDonationPlan | AnimalFarmingDonationPlan | PlantationDonationPlan | WaterFiltrationDonationPlan;
    createdAt: Date;

}
