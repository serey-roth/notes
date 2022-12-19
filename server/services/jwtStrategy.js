import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user.js';

const jwtLogin = new JwtStrategy(
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
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    },
);

export default jwtLogin;