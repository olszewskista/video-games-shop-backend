const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    messages: [{
        message: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            enum: ['user', 'admin'],
        }
    }],
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: String,
        required: true,
        default: () => Date.now()
    }
})

const Ticket = mongoose.model('ticket', ticketSchema)

module.exports = Ticket