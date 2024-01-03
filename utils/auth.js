require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'super secret string';
const maxAge = 60 * 60

function createToken(id) {
    return jwt.sign({ id }, SECRET, {expiresIn: maxAge});
}

module.exports = createToken