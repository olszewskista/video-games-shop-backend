require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.SECRET || 'super secret string';
const maxAge = 60 * 60;

function createToken(id) {
    return jwt.sign({ id }, SECRET, { expiresIn: maxAge });
}

function validateToken(token) {
    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
    return jwt.verify(token, public_key, {algorithms: ["RS256"]})
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
        // console.log(authToken)
        const validatedToken = validateToken(authToken);
        // console.log(validatedToken)
        res.locals.token = validatedToken;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.', error);
        return res.status(401).send('Invalid token');
    }
    next();
}

async function verifyAdmin(req, res, next) {
    try {
        const user = await User.findOne({email: res.locals.token.email});
        const isAdmin = user.roles.find(item => item === 'admin')
        if (!isAdmin) {
            throw new Error('Not authorized');
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send(error.message || 'Not authorized');
    }
    next();
}

module.exports = { createToken, checkAuthMiddleware, verifyAdmin };
