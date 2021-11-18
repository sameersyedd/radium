const mongoose = require('mongoose')

const publisherSchema = new mongoose.Schema({

    p_name: String,
    headQuarter: String

}, { timestamps: true })



module.exports = mongoose.model('myPublisher', publisherSchema)