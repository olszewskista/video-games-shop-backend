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



module.exports = router