import passport from 'passport';

const requireJWTAuth = passport.authenticate('jwt', { session: false });

export default requireJWTAuth;