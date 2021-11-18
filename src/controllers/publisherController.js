const authorModel = require("../models/authorModel.js")
const bookModel = require("../models/bookModel.js")
const publisherModel = require("../models/publisherModel")

const createPublisher = async function(req, res) {
    let publisherData = req.body
    let savedData = await publisherModel.create(publisherData)
    res.send({ data: savedData })
}


module.exports.createPublisher = createPublisher