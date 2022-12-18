import { Router } from 'express'
import passport from 'passport'

const router = new Router();

router.get('/google', 
    passport.authenticate('google', { 
        scope: ['email', 'profile'],
    }
));

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL_HOME,
        failureRedirect: process.env.CLIENT_URL_AUTH,
    }),
);

export default router;