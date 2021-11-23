const userModel = require("../models/userModel.js")
const productModel = require("../models/productModel.js")
const orderModel = require("../models/orderModel.js")

// probleme 3 & 4 create order with thorough validation!

const createOrder = async function(req, res) {
    // user authentication
    let userId = req.body.userId
    let productId = req.body.productId
    let appHeader = req.headers['isfreeapp']
    let appTypeFree = req.isFreeAppUser
    let orderAmount
    let orderDate = Date()
    if (appHeader === 'false') {
        appTypeFree = false
    } else {
        appTypeFree = true
    }

    let user = await userModel.findById(userId)
    if (!user) {
        return res.send({ message: "Invalid User" })
    }

    //product Authenticaion
    let product = await productModel.findById(productId)
    if (!product) {
        return res.send({ message: "Invalid Product" })
    }

    //user balance validation
    if (!appTypeFree && (user.balance < product.price)) {
        return res.send({ message: "Insufficient funds to purchase this product!" })
    }

    if (appTypeFree) {
        orderAmount = 0
    } else {
        //paid app
        orderAmount = product.price
    }

    let orderDetails = {
        userId: userId,
        productId: productId,
        amount: orderAmount,
        isFreeAppUser: appTypeFree,
        date: orderDate
    }

    let orderCreated = await orderModel.create(orderDetails)

    if (!appTypeFree) {
        await userModel.findOneAndUpdate({ _id: userId }, { balance: user.balance - product.price })
    }

    res.send({ data: orderCreated })

}

module.exports.createOrder = createOrder