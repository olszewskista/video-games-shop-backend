const { Router } = require("express");
const Game = require('../models/Game');
const User = require('../models/User');
const Order = require('../models/Order');
const { checkAuthMiddleware, verifyAdmin } = require("../utils/auth");

const router = Router()
router.use(checkAuthMiddleware)

//get list of games
router.get('/', async (req, res) => {
    try {
        const games = await Game.aggregate([
            {$sort: {views: -1}},
        ])
        res.status(200).json(games)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch games'})
    }
})

//add new game to store
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const game = new Game(req.body)
        await game.save()
        res.status(201).json(game)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not add game'})
    }
})

//get list of games spiecified by query parameters
router.get('/filter', async (req, res) => {
    try {
        let aggregateQuery = []
        let games;
        if (req.query.title !== '') {
            aggregateQuery.push({$match: {title: {$regex: req.query.title, $options: 'i'}}})
        }
        if (req.query.category !== '') {
            aggregateQuery.push({$match: {category: {$regex: req.query.category, $options: 'i'}}})
        }
        if (req.query.sort !== '') {
            const [key, order] = req.query.sort.split('_')
            aggregateQuery.push({$sort: {[key]: parseInt(order)}})
        }
        if (aggregateQuery.length === 0) {
            games = await Game.aggregate([{$sort: {views: -1}}])
        } else {
            games = await Game.aggregate(aggregateQuery)
        }
        res.status(200).json(games)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch games'})
    }
})

//get game with desired id
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        game.views = game.views + 1
        await game.save()
        res.status(200).json(game)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message || 'Could not fetch game'})
    }
})



module.exports = router