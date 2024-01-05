const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        enum: ['purchase', 'refund'],
        required: true
    },
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game',
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (val) => val > 0,
            message: 'Price must be greater than 0'
        }
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order