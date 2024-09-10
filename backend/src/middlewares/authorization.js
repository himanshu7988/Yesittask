const authorization = (role) => {
    return (req, res, next) => {
        if (req.body.userRole && req.body.userRole === role) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = authorization;
