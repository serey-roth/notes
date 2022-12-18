const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect(process.env.CLIENT_URL_HOME);
    } else {
        next();
    }
}

export default checkLoggedIn;