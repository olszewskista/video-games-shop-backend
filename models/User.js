const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        uniqe: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        uniqe: true,
        lowercase: true,
        validate: {
            validator: (val => /^([a-zA-Z][\w+-]+(?:\.\w+)?)@([\w-]+(?:\.[a-zA-Z]{2,10})+)$/.test(val)),
            message: "Please enter correct email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
