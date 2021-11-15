const bookModel = require("../models/bookModel.js")
const mongoose = require("mongoose")

const createBook = async function(req, res) {
        const book = req.body
        let savedBook = await bookModel.create(book)
        res.send({ msg: savedBook })
    }
    // ------------------------------------------------------------------------------------------------------
const bookList = async function(req, res) {

        let allBooks = await bookModel.find().select({ bookName: 1, author: 1, _id: 0 })


        res.send({ msg: allBooks })
    }
    // ------------------------------------------------------------------------------------------------------
const getXINRBooks = async function(req, res) {
        let allBooks = await bookModel.find({ 'prices.indianPrice': { $in: ["INR 100", "INR 200", "INR 500"] } })
        res.send({ msg: allBooks })
    }
    // ------------------------------------------------------------------------------------------------------
const getRandomBooks = async function(req, res) {
        let allBooks = await bookModel.find({ $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }] })
        res.send({ msg: allBooks })
    }
    // -------------------------------------------------------------------------------------------------------
const getBooksInYear = async function(req, res) {
        let allBooks = await bookModel.find({ year: req.body.year })
        res.send({ msg: allBooks })
    }
    // -------------------------------------------------------------------------------------------------------
const getParticularBooks = async function(req, res) {
    let allBooks = await bookModel.find(req.body)
    res.send({ msg: allBooks })
}

module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
module.exports.getParticularBooks = getParticularBooks