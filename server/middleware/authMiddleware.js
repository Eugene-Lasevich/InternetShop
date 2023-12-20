// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.session.token || req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticate };
