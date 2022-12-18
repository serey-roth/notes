const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect(process.env.CLIENT_URL_AUTH);
    }
}

export default checkAuthenticated;