import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = new Router();

router.get('/google', 
    passport.authenticate('google', { 
        scope: ['email', 'profile'],
    }
));

router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: process.env.CLIENT_URL_AUTH,
        session: false,
    }),
    (req, res) => {
        const { _id: id, email } = req.user;
        const token = jwt.sign({
            email,
            id
        }, 
        process.env.SECRET_KEY,
        { expiresIn: '12h'});
        res.cookie('x-auth-info', { email });
        res.cookie('x-auth-token', token);
        res.redirect(process.env.CLIENT_URL_HOME);
    }
);

export default router;