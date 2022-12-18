import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user.js';

const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
        secretOrKey: process.env.SECRET_KEY,
    },
    async (payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    },
);

export default jwtLogin;