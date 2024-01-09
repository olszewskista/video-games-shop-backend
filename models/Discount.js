const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => val.length >= 3,
            message: 'Code must be at least 3 characters long'
        }
    },
    discount: {
        type: Number,
        required: true,
        validate: {
            validator: (val) => val > 0 && val <= 100,
            message: 'Discount must be greater than 0 and less than 100'
        }
    }
})

const Discount = mongoose.model('discount', DiscountSchema)

module.exports = Discount