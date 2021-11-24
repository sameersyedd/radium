const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel.js")
const userController = require("../controllers/userController.js")
const loginController = require("../controllers/loginController")
const middleware = require("../Middleware/appMiddleware")



router.post('/users', userController.createUser);
router.post('/login', loginController.login);
router.get('/users/:userId', middleware.mid1, loginController.getUsers)
router.put('/users/:userId', middleware.mid1, loginController.update)

module.exports = router;