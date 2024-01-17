const { Router } = require('express');
const Review = require('../models/Review');
const { checkAuthMiddleware } = require('../utils/auth');

const router = Router();
router.use(checkAuthMiddleware);

//get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate({ path: 'author', select: 'username' });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).send('Could not fetch reviews');
    }
});

//get all reviews for a game
router.get('/:gameId', async (req, res) => {
    try {
        const reviews = await Review.find({gameId: req.params.gameId}).populate({ path: 'author', select: 'username' });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).send('Could not fetch reviews');
    }
});

//create a review
router.post('/', async (req, res) => {
    try {
        const review = new Review({
            gameId: req.body.gameId,
            author: res.locals.token.id,
            description: req.body.description,
            rating: req.body.rating,
            title: req.body.title,
        });
        await review.save();
        await review.populate('author', 'username');
        console.log(review);
        res.status(201).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).send('Could not create review');
    }
})

module.exports = router;