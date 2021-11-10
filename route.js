const express = require('express');

const router = express.Router();

const mov = ["Fast 9", "Knives Out", "Gone Girl", "No Time To Die"]

const movArr = [{ "ID": 1, "Name": "Maze Runner" }, { "ID": 2, "Name": "BirdBox" }, { "ID": 3, "Name": "Train to Busan" }, { "ID": 4, "Name": "Prestige" }]

router.get('/Sam', function(req, res) {
    res.send('Have no fear, Sam is here')
});

module.exports = router


// Problem 1-------------------------------------------------------

router.get('/movie', function(req, res) {
    res.send(mov)
});

//Problem 2--------------------------------------------------------

router.get('/movies/:mID', function(req, res) {
    let index = req.params.mID
    let mIndex = mov[index]
    res.send(mIndex)
});

//Problem 3--------------------------------------------------------

router.get('/moviess/:mIDD', function(req, res) {
    let iindex = req.params.mIDD
    let mmIndex = mov[iindex]

    if (iindex > mov.length) {
        res.send("Invalid Input")
    } else {
        res.send(mmIndex)
    }
});

//Problem 4---------------------------------------------------------

router.get('/films', function(req, res) {
    res.send(movArr)
});

//Problem 5---------------------------------------------------------

router.get('/films/:filmId', function(req, res) {
    let film = req.params.filmId
    let filmlist = movArr[film - 1]
    if (film <= movArr.length) {
        res.send(filmlist)
    } else {
        res.send("No movie exists with this id ")
    }

});