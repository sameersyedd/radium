const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

const cartController = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')

// User routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user/:userId/profile', authMiddleware, userController.getUserProfile)
router.put('/user/:userId/profile', authMiddleware, userController.updateUserProfile)

// product routes
router.post('/products', productController.createProduct)
router.get('/products', productController.getAllProducts)
router.get('/products/:productId', productController.getProductDetails)
router.put('/products/:productId', productController.updateProduct)
router.delete('/products/:productId', productController.deleteProduct)

// cart routes
router.post('/users/:userId/cart', authMiddleware, cartController.createCart)
router.get('/users/:userId/cart', authMiddleware, cartController.getCart)
router.put('/users/:userId/cart', authMiddleware, cartController.updateCart)

module.exports = router;