const express = require('express');
const router = express.Router();
const BookModel = require("../models/bookModel")

const BookController = require("../controllers/bookController")


router.get('/test-me', function(req, res) {
    res.send('My first ever api!')
});

router.post('/createBook', BookController.createBook);
router.get('/getAllBook', BookController.getBookData);


module.exports = router;