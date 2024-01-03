const { Router } = require('express');
const User = require('../models/User');
const createToken = require('../utils/auth')

const router = Router();

router.post('/login', (req, res) => {
    res.send('login');
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const user = new User({ name, email, password });
        await user.save();
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60})
        res.status(201).json({user: user._id})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

router.post('/logout', (req, res) => {
    res.send('logout');
});

module.exports = router;
