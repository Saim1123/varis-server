import mongoose from "mongoose";

import { config } from "./env"

async function connectToDB() {
    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from DB");
    });

    mongoose.connection.on("error", (error) => {
        console.error(`MongoDB error: ${error}`);
    });

    try {
        await mongoose.connect(config.DATABASE_URL)
        console.log("Connected to DB");
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export { connectToDB };