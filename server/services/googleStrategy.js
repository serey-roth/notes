import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from 'dotenv';

import User from "../models/user.js";

dotenv.config();

export const googleLogin = new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5050/auth/google/callback',
        passReqToCallback: true,
        proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ email: profile.email });

            if (existingUser) {
                req.user = existingUser;
                return done(null, existingUser);
            }

            const newUser = await new User({
                email: profile.email,
                name: profile.displayName
            }).save();

            req.user = newUser;
            return done(null, newUser);
        } catch (error) {
            console.log(error.message)
        }
    }
)
