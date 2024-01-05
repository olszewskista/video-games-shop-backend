const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    gameId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

const Review = mongoose.model('review', ReviewSchema)

module.exports = Review