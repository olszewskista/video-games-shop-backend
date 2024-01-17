const { Router } = require('express');
const User = require('../models/User');
const Game = require('../models/Game');
const { checkAuthMiddleware, verifyAdmin } = require('../utils/auth');

const router = Router();
router.use(checkAuthMiddleware);


//get currently logged in user
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch user'});
    }
});

//update auth info of currently logged in user
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
        console.log(error);
        res.status(500).json({error: error.message || 'Could not update user auth'});
    }
});

//update address of currently logged in user
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
        res.status(500).json({error: error.message || 'Could not update user address'});
    }
});

//update credit card info of currently logged in user
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
        res.status(500).json({error: error.message || 'Could not update user credit card'});
    }
});

//get currently logged in user's library
router.get('/library', async (req, res) => {
    try {
        const user = await User.findById(res.locals.token.id).populate('library');
        res.status(200).json(user.library);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch user library'});
    }
});

//get currently logged in user's order history
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
        res.status(500).json({error: error.message || 'Could not fetch user library'});
    }
});

//update currently logged in user's favorite games
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
        res.status(500).json({error: error.message || 'Could not update user favorites'});
    }
})

//get user with desired email
router.get('/:email', verifyAdmin, async (req, res) => {
    try {
        const user = await User.find({email: req.params.email});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch user'});
    }
});

//delte currently logged in user
router.delete('/', async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(res.locals.token.id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not delete user'});
    }
});

//delete user with desired id
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not delete user'});
    }
})

//change desired user property
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.body.key === 'balance') {
            user[req.body.key] = parseInt(req.body.value);
        } else if (req.body.key === 'isAdmin') {
            user[req.body.key] = Boolean(parseInt(req.body.value));
        } else {
            user[req.body.key] = req.body.value;
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not update user'});
    }
})

module.exports = router;