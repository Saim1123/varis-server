import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './env';
import * as UserService from '../services/user.service';

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID!,
            clientSecret: config.GOOGLE_CLIENT_SECRET!,
            callbackURL: config.GOOGLE_AUTH_REDIRECT_URI,
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error('No email found in Google profile'), undefined);
                }

                // Check if user exists
                let user = await UserService.findUserByEmail(email);

                if (!user) {
                    // Create new user from Google profile
                    const [firstName, ...lastNameParts] = (profile.displayName || '').split(' ');
                    const lastName = lastNameParts.join(' ') || firstName;

                    user = await UserService.createUser({
                        firstName,
                        lastName,
                        email,
                        password: '', // Google users don't have password
                        phoneNumber: '', // Can be updated later
                        authProvider: 'google',
                        googleId: profile.id,
                    });
                } else if (!user.googleId) {
                    // Link existing account with Google (if email matches)
                    const updatedUser = await UserService.updateUserProfile(user._id.toString(), {
                        googleId: profile.id,
                        authProvider: 'google',
                    });
                    user = updatedUser || user;
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;
