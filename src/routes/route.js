const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')
const productController = require('../controllers/productController.js')
const validMiddleware = require('../middlewares/validMiddleware.js')
const orderController = require('../controllers/orderController.js')




router.post('/createUser', validMiddleware.mid1, userController.createUser)
router.post('/createProduct', productController.createProduct)
router.post('/createOrder', validMiddleware.mid1, orderController.createOrder)
1
module.exports = router;