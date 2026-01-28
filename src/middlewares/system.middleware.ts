import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const systemMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (req.user.role !== 'system') {
            return res.status(403).json({ error: "Forbidden: System access required" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
