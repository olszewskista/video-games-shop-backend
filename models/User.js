const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        default: ''
    },
    postCode: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
})

const CreditCardSchema = new mongoose.Schema({
    owner: {
        type: String,
        default: ''
    },
    number: {
        type: String,
        default: ''
    },
    expireMonth: {
        type: Number,
    },
    expireYear: {
        type: Number,
    },
    cvv: {
        type: Number,
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: (val) =>
                /^([a-zA-Z][\w+-]+(?:\.\w+)?)@([\w-]+(?:\.[a-zA-Z]{2,10})+)$/.test(
                    val
                ),
            message: 'Please enter correct email',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    library: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game'
    }],
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    orderHistory: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'order'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game'
    }],
    tickets: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ticket'
    }],
    address: AddressSchema,
    creditCard: CreditCardSchema
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if (!user) {
        throw new Error('Incorrect email!')
    }

    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
        return user
    }

    throw new Error('Incorrect password!')
}

const User = mongoose.model('user', UserSchema);

module.exports = User;
