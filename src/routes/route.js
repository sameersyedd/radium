const express = require('express');
const router = express.Router();
const cowinController = require("../controllers/cowinController")
const weatherController = require("../controllers/weatherController")



router.get('/cowin/states', cowinController.getStates);
router.get('/cowin/districts/:stateId', cowinController.getDistrict)
router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)
router.get('/getLondonW', weatherController.getLondonW)
router.get('/getLondonTemp', weatherController.getLondonT)
router.get('/getWeather', weatherController.getWeather)

module.exports = router;