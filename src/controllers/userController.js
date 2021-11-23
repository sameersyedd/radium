const userModel = require("../models/userModel.js")
const productModel = require("../models/productModel.js")
const mongoose = require('mongoose')


// Problem 2 
const createUser = async function(req, res) {
    let userDetails = req.body
    let appType = req.headers['isfreeapp']
    let userType
    if (appType === 'false') {
        userType = false
    } else {
        userType = true
    }

    userDetails.freeAppUser = req.isFreeAppUser // for middleware
    let userCreated = await userModel.create(userDetails)
    res.send({ data: userCreated })
}


module.exports.createUser = createUser