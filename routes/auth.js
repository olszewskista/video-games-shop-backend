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
        console.log(error);
        res.status(400).json({error: error.message || 'Could not login'})
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
        console.log(error);
        if (error.code === 11000) return res.status(400).json({error: 'Email already exists'})
        res.status(400).json({error: error.message || 'Could not register'})
    }
});

//verify discount code and return discount value
router.get('/discount/:code', async (req, res) => {
    try {
        const discount = await Discount.find({code: req.params.code});
        if (discount.length === 0) throw new Error('Code not found');
        res.status(200).json({discount: discount[0].discount});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message || 'Could not verify discount code'})
    }
})

//verify admin
router.get('/admin', checkAuthMiddleware, verifyAdmin, async (req, res) => {
    res.status(200).json({message: 'Admin verified'})
})

module.exports = router;
