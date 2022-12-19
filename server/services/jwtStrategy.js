import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv'

import User from '../models/user.js';

dotenv.config();

const jwtAuth = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    },
    async (payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid credentials'});
            }
        } catch (error) {
            return done(error);
        }
    },
);

export default jwtAuth;