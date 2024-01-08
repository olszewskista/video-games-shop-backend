const { Router } = require("express");
const Game = require('../models/Game');
const User = require('../models/User');
const Order = require('../models/Order');
const { checkAuthMiddleware } = require("../utils/auth");

const router = Router()

//get list of games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
        console.log(res.locals.token)
        res.status(200).json(games)
    } catch (error) {
        res.status(500).send('Could not fetch games')
    }
})

//get game with desired id
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        res.status(200).json(game)
    } catch (error) {
        res.status(500).send('Could not fetch game')
    }
})

//buy game with desired id
router.post('/:id/buy', checkAuthMiddleware, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        const user = await User.findById(res.locals.token.id)
        if (user.library.includes(game._id)) {
            throw new Error('You already own this game')
        }
        if (req.body.payment === 'balance' && user.balance < req.body.price) {
            throw new Error('You do not have enough money to buy this game')
        }
        const order = new Order({
            user: user._id,
            game: game._id,
            type: 'purchase',
            payment: req.body.payment,
            price: req.body.price,
            date: Date.now()
        })
        await order.save()
        user.orderHistory.push(order._id)
        user.balance -= game.price
        user.library.push(game._id)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message || error)
    }

})

module.exports = router