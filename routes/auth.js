const { Router } = require('express');
const User = require('../models/User');
const {createToken} = require('../utils/auth')

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        // res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60})
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = createToken(user._id)
        // res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60})
        res.status(201).json({token})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

router.post('/logout', (req, res) => {
    res.send('logout');
});

module.exports = router;
