const bookModel = require('../models/bookModel')
const redis = require("redis")
const { promisify } = require("util")
const limit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5
});


// Connecting to redis -----------------------------------------------------------
const redisClient = redis.createClient(
    18708,
    "redis-18708.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true }
);
redisClient.auth("c4wumzAqu1aqeSjGmtoGJ65S3kUkwtdT", function(err) {
    if (err) throw err;
});

redisClient.on("connect", async function() {
    console.log("Connected to Redis..Let's GO");
});


//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
// ----------------------------------------------------------------------------------

const isValid = function(value) {
    if (value == "undefined" || value == null) return false
    if (value == "string" && value.trim().length == 0) return false
    return true;
}

const isValidRequestBody = function(value) {
    return Object.keys(value).length > 0
}

//API 1 - create books=====================================================================================
let createBook = async function(req, res) {
    try {
        const requestBody = req.body
        const { name, author, category } = requestBody
        const bookDetails = { name, author, category }
        const createBook = await bookModel.create(bookDetails)
        return res.status(200).send({ status: true, Message: "book created successfully", data: createBook })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//API 2 Get Books ==========================================================================
let getBook = async function(req, res) {
    try {
        const bookId = req.params.bookId
        let cachedData = await GET_ASYNC(`${bookId}`)
        if (cachedData) {
            const books = JSON.parse(cachedData)
            res.status(200).send({ msg: "fetched successfully from cache", data: books })
        }
        const booksDetails = await bookModel.findById({ _id: bookId })
        if (booksDetails) {
            let books = booksDetails
            await SET_ASYNC(`${bookId}`, JSON.stringify(booksDetails))
            res.status(200).send({ status: true, data: books })
        } else {
            res.status(200).send({ status: false, msg: "book not found" })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createBook, getBook }