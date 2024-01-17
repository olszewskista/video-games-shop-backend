const { Router } = require('express');
const User = require('../models/User');
const Discount = require('../models/Discount');
const {createToken, verifyAdmin, checkAuthMiddleware} = require('../utils/auth')

const router = Router();

//login user with email and password
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

//register user with email, username and password
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = createToken(user._id)
        res.status(201).json({token})
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({error: 'Email already exists'})
        res.status(400).json({error: error.message})
    }
});

//verify discount code and return discount value
router.get('/discount/:code', async (req, res) => {
    try {
        const discount = await Discount.find({code: req.params.code});
        res.status(200).json({discount: discount[0].discount});
    } catch (error) {
        res.status(400).json({error: 'Code not found'})
    }
})

//verify admin
router.get('/admin', checkAuthMiddleware, verifyAdmin, async (req, res) => {
    res.status(200).json({message: 'Admin verified'})
})

module.exports = router;
