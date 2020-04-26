const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);
    // Check for token
    if (!token) res.send(401).json({ msg: 'No token, authorization denied' });

    try {
        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add admin from payload
        req.admin = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({ msg : 'Token is not valid' });
    }

}

module.exports = auth;