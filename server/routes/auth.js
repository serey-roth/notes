import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

import User from "../models/user.js";

const router = new Router();

const middleware = (strategy) => (req, res, next) => {
    passport.authenticate(
        strategy, 
        { session: false },
        async (error, user, info) => {
            console.log(error, user, info)
            if (info instanceof Error) return res.status(500).json({ message: info.message });
            if (error) return res.status(500).json({ message: error.message });
            if (!user) return res.status(400).send(info);
            req.user = user;
            next();
        }
    )(req, res, next);
}

const googleMiddleware = async (req, res, next) => {
    const { credential } = req.body;
    const { email, name } = jwt.decode(credential);

    try {

        let user;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            user = existingUser;
        } else {
            user = await new User({
                provider: 'email',
                email: email,
                name: name,
            }).save();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const successCallback = (req, res) => {
    const token = req.user.generateJWT();
    const me = req.user.toJSON();
    res.status(200).json({ me, token });
}

router.post(
    '/login', 
    middleware('local-login'),
    successCallback
);

router.post(
    '/register', 
    middleware('local-register'),
    successCallback
);

router.post(
    '/googleLogin',
    googleMiddleware,
    successCallback
)

export default router;