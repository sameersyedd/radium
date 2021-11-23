const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
    },
    productId: {
        type: ObjectId,
    },
    isFreeAppUser: Boolean,
    Date: Date,

}, { timestamps: true })



module.exports = mongoose.model('myOrder', orderSchema)