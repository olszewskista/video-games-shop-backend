require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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
        return res.status(401).send('Authorization header required');
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return res.status(401).send('Authorization header invalid');
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateToken(authToken);
        res.locals.token = validatedToken;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.');
        return res.status(401).send('Invalid token');
    }
    next();
}

async function verifyAdmin(req, res, next) {
    try {
        const user = await User.findById(res.locals.token.id);
        if (!user.isAdmin) {
            throw new Error('Not authorized');
        }
    } catch (error) {
        return res.status(401).send(error.message || 'Not authorized');
    }
    next();
}

module.exports = { createToken, checkAuthMiddleware, verifyAdmin };
