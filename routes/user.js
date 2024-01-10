const { Router } = require('express');
const User = require('../models/User');
const Game = require('../models/Game');
const { checkAuthMiddleware } = require('../utils/auth');
const { default: mongoose } = require('mongoose');

const router = Router();
router.use(checkAuthMiddleware);

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Could not fetch user');
    }
});

router.put('/update/auth', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Could not update user auth');
    }
});

router.put('/update/address', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        user.address = {
            street: req.body.street,
            city: req.body.city,
            postCode: req.body.postCode,
            country: req.body.country,
        };
        await user.save();
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not update user address');
    }
});

router.put('/update/creditCard', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        user.creditCard = {
            owner: req.body.owner,
            number: req.body.number,
            expireMonth: req.body.expireMonth,
            expireYear: req.body.expireYear,
            cvv: req.body.cvv,
        };
        await user.save();
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not update user credit card');
    }
});

router.get('/library', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id).populate('library');
        res.status(200).json(user.library);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not fetch user library');
    }
});

router.get('/orders', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id).populate({
            path: 'orderHistory',
            populate: {
                path: 'game',
                model: 'game',
            },
        
        });
        user.orderHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json(user.orderHistory);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not fetch user library');
    }
});

router.post('/favorites/:gameId', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        if (user.favorites.includes(req.params.gameId)) {
            user.favorites = user.favorites.filter(
                (game) => !game.equals(req.params.gameId)
            );
        } else {
            user.favorites.push(req.params.gameId);
        }
        await user.save();
        res.status(200).json(user.favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not update user favorites');
    }
})

module.exports = router;