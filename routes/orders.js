const {Router} = require('express')
const Game = require('../models/Game')
const User = require('../models/User')
const Order = require('../models/Order')
const {checkAuthMiddleware} = require('../utils/auth')

const router = Router()

//buy game with desired id
router.post('/buy/:gameId', checkAuthMiddleware, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        const user = await User.findById(res.locals.token.id)
        console.log(req.body.price)
        console.log(req.body.payment)
        console.log(req.body)
        if (user.library.includes(game._id)) {
            throw new Error('You already own this game')
        }
        if (req.body.payment === 'balance' && user.balance < req.body.price) {
            throw new Error('You do not have enough money to buy this game')
        }
        if (req.body.payment === 'creditCard' && !user.creditCard) {
            throw new Error('You do not have a valid credit card')
        }
        if (!user.address) {
            throw new Error('You have to enter an address')
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
        if (req.body.payment === 'balance') user.balance -= game.price
        user.library.push(game._id)
        await user.save()
        res.status(200).json({id: order._id})
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
})

router.post('/refund/:orderId', (req, res) => {})