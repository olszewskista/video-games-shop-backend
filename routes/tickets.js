const mongoose = require('mongoose')
const Ticket = require('../models/Ticket')
const {Router} = require('express')
const {checkAuthMiddleware} = require('../utils/auth')

const router = Router()
router.use(checkAuthMiddleware)

//get list of tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).send(error.message || 'Could not fetch tickets')
    }
})

//get tickets of user with desired id
router.get('/user', async (req, res) => {
    try {
        const tickets = await Ticket.find({user: res.locals.token.id})
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).send(error.message || 'Could not fetch tickets')
    }
})

//create new ticket
router.post('/add', async (req, res) => {
    try {
        console.log(res.locals.token)
        const ticket = new Ticket({
            title: req.body.title,
            messages: [
                {message: req.body.message, sender: 'user'}
            ],
            status: 'open',
            user: res.locals.token.id,
        })
        await ticket.save()
        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).send(error.message || 'Could not add ticket')
    }
})

//add message to ticket with desired id
router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        const newMessage = {message: req.body.message, sender: req.body.sender}
        ticket.messages.push(newMessage)
        await ticket.save()
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).send(error.message || 'Could not add message to ticket')
    }
})

module.exports = router