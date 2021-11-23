const productModel = require("../models/productModel.js");
const mongoose = require("mongoose");
const userModel = require("../models/userModel.js");

// Problem 1 create product

const createProduct = async function(req, res) {
    let productData = req.body
    let savedData = await productModel.create(productData)
    res.send({ data: savedData })
}

module.exports.createProduct = createProduct;