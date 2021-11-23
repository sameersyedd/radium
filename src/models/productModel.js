const mongoose = require('mongoose')
    // const ObjectId = mongoose.Schema.Types.ObjectId


const productSchema = new mongoose.Schema({

    p_name: String,
    category: String,
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('myProduct', productSchema)