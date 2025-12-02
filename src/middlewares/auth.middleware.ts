import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config/env"

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized, no token provided" });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}