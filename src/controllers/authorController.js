const authorModel = require("../models/authorModel.js")
const bookModel = require("../models/bookModel.js")
const mongoose = require('mongoose')


// Problem 1 create author data
const createAuthor = async function(req, res) {
    var authorData = req.body
    if (authorData.author_id) {
        let savedData = await authorModel.create(authorData)
        res.send({ msg: savedData })
    } else {
        res.send("Please input author ID")
    }
}

// problem 3 get author of two states & update book price to 100//
const twoStates = async function(req, res) {
    let authorID = await bookModel.findOne({ name: "Two states" }).select({ author_id: 1, _id: 0 })
    console.log(saved)

    let author = await authorModel.findOne(authorID).select({ author_name: 1, _id: 0 })

    let priceUpdate = await bookModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true }).select({ price: 1, _id: 0 })
        //findOneAndUpdate( filter, update, options )
    res.send({ msg: author, priceUpdate })
}


// Problem 4 Books between 50 to 100 and send back Author name-------------------------------
const cost50to100 = async function(req, res) {
    let book50to100 = await bookModel.find({ "prices": { $gte: 50, $lte: 100 } }).select({ author_id: 1 })
    console.log(book50to100)
    let len = book50to100.length;
    // console.log(len)
    let arr = [];
    for (let i = 0; i < len; i++) {
        let id = book50to100[i].author_id;
        // console.log(id)
        let bookInRange = await authorModel.find({ author_id: id }).select({ author_name: 1, _id: 0 })
        arr.push(bookInRange);
    }
    res.send({ msg: arr });
}



// get all authors // this is for me
const getAuthorData = async function(req, res) {
    let allAuthors = await authorModel.find()
    res.send({ msg: allAuthors })
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorData = getAuthorData
module.exports.twoStates = twoStates
module.exports.cost50to100 = cost50to100