const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')



// books Routes
router.post('/books', bookController.createBook);
router.get('/books/:bookId', bookController.getBook);


module.exports = router;