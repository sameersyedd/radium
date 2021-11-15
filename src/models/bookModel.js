const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({



    bookName: {
        type: String,
        required: true
    },

    author: String,
    tags: [String],
    year: Number,
    totalPages: Number,
    stockAvailable: Boolean,

    prices: {
        indianPrice: String,
        europeanPrice: String,
    }

}, { timestamps: true })

module.exports = mongoose.model('Boook', bookSchema)