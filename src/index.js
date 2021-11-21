const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const globalMW = function(req, res, next) {
    let dateNow = new Date()
    let datetime = dateNow.getDate() + " " +
        (dateNow.getMonth() + 1) + " " +
        dateNow.getFullYear() + " " +
        dateNow.getHours() + " " +
        dateNow.getMinutes() + " " +
        dateNow.getSeconds() + " " +
        dateNow.getMilliseconds();

    let ip = req.ip
    let currentAPI = req.originalUrl
    console.log(`Today's Date is: ${datetime}-current IP is: ${ip}-Current Router is: ${currentAPI}`)
}
app.use(globalMW)


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/SM_Sameer-database?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('Mongo DB is ready to roll'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});