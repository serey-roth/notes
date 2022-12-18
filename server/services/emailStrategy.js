import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'

import User from '../models/user.js'

export const emailLogin = new LocalStrategy(
    {
        userNameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return done(null, false, { message: 'Email does not exist!' });
            }

            const isCorrectPassword = bcrypt.compare(password, existingUser.password);

            if (isCorrectPassword) {
                return done(null, existingUser);
            } else {
                return done(null, false, { message: 'Incorrect password '});
            }
            
        } catch (error) {
            return done(error);
        }
    }
)

export default emailLogin;