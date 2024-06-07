const {Router} = require('express')
const Game = require('../models/Game')
const User = require('../models/User')
const Order = require('../models/Order')
const {checkAuthMiddleware} = require('../utils/auth')
const Discount = require('../models/Discount')

const router = Router()
router.use(checkAuthMiddleware)

//buy game with desired id
router.post('/buy/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        const user = await User.findOne({email: res.locals.token.email})
        let discount = await Discount.findOne({code: req.body.code})
        if (discount) {
            discount = discount.discount/100
        } else {
            discount = 0
        }
        if (user.library.includes(game._id)) {
            throw new Error('You already own this game')
        }
        if (req.body.payment === 'balance' && user.balance < (game.price * (1 - discount)).toFixed(2)) {
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
            price: (game.price * (1 - discount)).toFixed(2),
            date: Date.now(),
            refundable: true
        })
        await order.save()
        user.orderHistory.push(order._id)
        if (req.body.payment === 'balance') user.balance -= order.price
        user.library.push(game._id)
        await user.save()
        res.status(200).json({id: order._id, balance: user.balance, library: user.library})
    } catch (error) {
        console.log(error);
        if (error instanceof Error) res.status(400).json({error: error.message})
        else res.status(500).json({error: error.message || 'Could not buy game'})
    }
})

//refund order with desired id
router.post('/refund/:orderId', async (req, res) => {
    try {
        const user = await User.findOne({ email: res.locals.token.email });
        const order = await Order.findById(req.params.orderId)
        if (!order.refundable) {
            throw new Error('You cannot refund this order')
        }
        const refund = new Order({
            user: user._id,
            game: order.game,
            type: 'refund',
            payment: order.payment,
            price: order.price,
            date: Date.now(),
            refundable: false
        })
        await refund.save()
        user.orderHistory.push(refund._id)
        if (order.payment === 'balance') user.balance += order.price
        user.library = user.library.filter(game => !game.equals(order.game))
        await user.save()
        order.refundable = false
        await order.save()
        res.status(200).json({balance: user.balance, library: user.library})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not refund order'})
    }
})

module.exports = router