require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'super secret string';
const maxAge = 60 * 60

function createToken(id) {
    return jwt.sign({ id }, SECRET, {expiresIn: maxAge});
}

function checkAuthMiddleware(req, res, next) {
    const token = req.cookies.jwt
    if (!token) {
        res.status(400).json({error: 'You have to be logged in', redirectURL: '/login'})
    } else {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                res.status(400).json({error: err.message, redirectURL: '/login'})
            } else {
                next()
            }
        })
    }
}

module.exports = {createToken, checkAuthMiddleware}