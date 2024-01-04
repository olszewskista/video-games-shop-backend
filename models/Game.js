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
    }
})

const Game = mongoose.model('game', GameSchema)

module.exports = Game