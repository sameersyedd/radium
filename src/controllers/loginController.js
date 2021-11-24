const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const middleware = require("../Middleware/appMiddleware.js")


// problem 2 validate login and create web token
const login = async function(req, res) {
    try {
        if (req.body && req.body.name && req.body.password) {
            let user = await userModel.findOne({ name: req.body.name, password: req.body.password, isDeleted: false }, { createdAt: 0, updatedAt: 0, _v: 0 })
            if (user) {
                let payload = { _id: user._id }
                let token = jwt.sign(payload, "sameer")
                res.header('x-auth-token', token) //adding a new header in response headers

                res.status(200).send({ Status: true, data: { userId: user._id }, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljYjZiMGJlMGFmNjJiNDkxNzQ5YmIiLCJpYXQiOjE2Mzc3NDUwMjZ9.4kvbJ0nds9ZrZbXOR6rfsetHp5xrvkPIiPQ6EqIltsA" })
            } else {
                res.status(401).send({ status: false, message: "Invalid user name or password" })
            }
        } else {

            res.status(400).send({ status: false, message: "User name and password is missing from request body" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// problem 3 get user details/ decode token/updated

const getUsers = async function(req, res, ) {
    let user = await userModel.findOne({ _id: req.params.userId })
        // if (user._id == req.params.userId)
    if (user) {
        res.send({ msg: user })
    } else {
        res.send({ msg: "Invalid User" })
    }
}


// problem 4 updated


const update = async function(req, res) {

    let user = await userModel.findOne({ _id: req.params.userId })
    if (user) {
        let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { "email": "sms@gmail.com" }, { new: true })
        res.send({ updatedUser })
    } else {
        res.send({ error: "error" })
    }
}


module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.update = update;