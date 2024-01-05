require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'super secret string';
const maxAge = 60 * 60;

function createToken(id) {
    return jwt.sign({ id }, SECRET, { expiresIn: maxAge });
}

function validateToken(token) {
    return jwt.verify(token, SECRET)
}

function checkAuthMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING.');
        return res.status(400).send('not authorized');
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return res.status(400).send('not authorized');
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateToken(authToken);
        res.locals.token = validatedToken;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.');
        return res.status(400).send('not authorized');
    }
    next();
}

module.exports = { createToken, checkAuthMiddleware };
