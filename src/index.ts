import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./config/env";
import { connectToDB } from "./config/db";

import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
import donationRoutes from "./routes/donation.route";

const app = express();

app.use(cors({
    origin: config.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(morgan('dev'));

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running!"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
