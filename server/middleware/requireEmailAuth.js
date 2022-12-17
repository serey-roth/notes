import passport from "passport";

const requireEmailAuth = passport.authenticate(
    'local',
    (error, user,  info) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(400).send(info);
        }

        req.user = user;
        next();
    }
);

export default requireEmailAuth;