const { Router } = require('express');
const User = require('../models/User');
const Discount = require('../models/Discount');
const {createToken} = require('../utils/auth')

const router = Router();

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

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = createToken(user._id)
        res.status(201).json({token})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

router.get('/discount/:code', async (req, res) => {
    try {
        const discount = await Discount.find({code: req.params.code});
        res.status(200).json({discount: discount[0].discount});
    } catch (error) {
        res.status(400).json({error: 'Code not found'})
    }
})

router.post('/logout', (req, res) => {
    res.send('logout');
});

module.exports = router;
