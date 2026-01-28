import express from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${config.FRONTEND_URL}/login?error=auth_failed` }),
    (req, res) => {
        try {
            const user = req.user as any;
            console.log("Google Auth Callback - User:", user);

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                config.JWT_SECRET!,
                { expiresIn: '7d' }
            );
            console.log("Google Auth Callback - Token generated");

            const redirectUrl = `${config.FRONTEND_URL}/auth/google/success?token=${token}`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Google auth error:', error);
            res.redirect(`${config.FRONTEND_URL}/login?error=authentication_failed`);
        }
    }
);

export default router;
