const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AddressSchema = new mongoose.Schema({
    street: String,
    postCode: String,
    city: String,
    country: String
})

const CreditCardSchema = new mongoose.Schema({
    owner: String,
    number: String,
    expireDay: Number,
    expireMonth: Number,
    ccv: Number
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    address: AddressSchema,
    creditCard: CreditCardSchema
});

UserSchema.pre('save', async function (next) {
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
