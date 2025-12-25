import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        console.log(req.user)

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden: Admin access required" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
