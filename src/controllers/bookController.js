const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel.js");
const publisherModel = require("../models/publisherModel.js");

// Problem 2 & Modified create book data and validate author id and publisher id

const createBook = async function(req, res) {
    const data = req.body;
    let authorId = req.body.author
    let publisherId = req.body.publisher
    let authorFromReq = await authorModel.findById(authorId)
    let publisherFromReq = await publisherModel.findById(publisherId)

    if (authorFromReq) {
        if (publisherFromReq) {

            let bookCreated = await bookModel.create(data)
            res.send({ data: bookCreated })
        } else {
            res.send({ Message: "Please Enter PublisherID" })
        }
    } else {
        res.send({ Message: "Please Enter AuthorID" })
    }
};
// Problem 3 & 5get book data with author details and display only  _id, author_name and age.

const getBooksAndAuthor = async function(req, res) {
    let booksData = await bookModel.find().populate('author', { "author_name": 1, "_id": 1, "age": 1 })
    res.send({ data: booksData })
};


// bookModel.find(author).populate('author', 'age, _id, author_name')

module.exports.createBook = createBook;
module.exports.getBooksAndAuthor = getBooksAndAuthor;