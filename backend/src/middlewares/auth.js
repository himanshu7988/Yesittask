const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (token === 'Bearer himanshukatoken') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;
