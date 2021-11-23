const mongoose = require('mongoose')
const userController = require('../controllers/userController')

const userSchema = new mongoose.Schema({

    name: String,
    balance: {
        type: Number,
        default: 100,
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    freeAppUser: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



module.exports = mongoose.model('myUser', userSchema)