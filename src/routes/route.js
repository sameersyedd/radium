const express = require('express');
const router = express.Router();
const authorModel = require("../models/authorModel")
const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController");
const publisherModel = require('../models/publisherModel');
const publisherController = require("../controllers/publisherController");


router.get('/test-me', function(req, res) {
    res.send('My first ever api!')
});

router.post('/createAuthors', authorController.createAuthors);
router.post('/createBook', bookController.createBook);
router.post('/createPublisher', publisherController.createPublisher)
router.get('/getBooksAndAuthor', bookController.getBooksAndAuthor)

module.exports = router;