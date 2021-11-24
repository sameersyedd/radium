const userModel = require("../models/userModel.js")
const mongoose = require('mongoose')


// Problem 1 create author data
const createUser = async function(req, res) {
    let userData = req.body
    let savedData = await userModel.create(userData)
    res.send({ user: savedData })
}


module.exports.createUser = createUser