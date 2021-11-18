const authorModel = require("../models/authorModel.js")
const bookModel = require("../models/bookModel.js")
const mongoose = require('mongoose')


// Problem 1 create author data
const createAuthors = async function(req, res) {
    let authorData = req.body
    let savedData = await authorModel.create(authorData)
    res.send({ data: savedData })
}


module.exports.createAuthors = createAuthors