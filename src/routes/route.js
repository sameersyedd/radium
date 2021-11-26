const express = require('express');
const router = express.Router();
const authorModel = require("../models/coinModel")

const coinController = require("../controllers/coinController")


router.get('/getCoin', coinController.getCoin)

module.exports = router;