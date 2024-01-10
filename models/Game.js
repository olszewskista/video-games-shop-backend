const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (val) => val > 0,
            message: 'Price must be greater than 0'
        }
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['action', 'adventure', 'casual', 'indie', 'multiplayer', 'racing', 'rpg', 'simulation', 'sports', 'strategy']
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
})

const Game = mongoose.model('game', GameSchema)

module.exports = Game