import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'

import User from '../models/user.js'

export const localLogin = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    async (email, password, done) => {
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


export const localRegister = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return done(null, false, { message: 'Email is already taken!'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                ...req.body,
                email,
                password: hashedPassword,
                provider: 'email',
            });
            await user.save();

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
)