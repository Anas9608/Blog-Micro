const protect = (req, res, next) => {
    const {user} = req.session;
    if(!req.session.user) {
        res.status(401).json({ status: "failed", data: "user not authorised" });
    }
    req.user = user;
    next();
};

module.exports = protect;