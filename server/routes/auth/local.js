import { Router } from "express";
import passport from "passport";

const router = new Router();

const middleware = (strategy) => (req, res, next) => {
    passport.authenticate(
        strategy, 
        { session: false },
        async (error, user, info) => {
            if (error) return next(error);
            if (!user) return res.status(400).send(info);
            req.user = user;
            next();
        }
    )(req, res, next);
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

export default router;