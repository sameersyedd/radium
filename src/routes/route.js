const { query } = require('express');
const express = require('express');

const router = express.Router();

const mov = ["Fast 9", "Knives Out", "Gone Girl", "No Time To Die"]

const movArr = [{ "ID": 1, "Name": "Maze Runner" }, { "ID": 2, "Name": "BirdBox" }, { "ID": 3, "Name": "Train to Busan" }, { "ID": 4, "Name": "Prestige" }]

const movArr2 = [{
        "ID": 1,
        "Name": "Maze Runner",
        "Rating": 6,
        "Director": "Wes Ball",
        "Genre": "Thriller"
    },
    {
        "ID": 2,
        "Name": "BirdBox",
        "Rating": 8,
        "Director": "Susanne Bier",
        "Genre": "Mystery"
    },
    {
        "ID": 3,
        "Name": "Train to Busan",
        "Rating": 9,
        "Director": "MR. XYZ",
        "Genre": "Mystery"
    },
    {
        "ID": 4,
        "Name": "Prestige",
        "Rating": 7,
        "Director": "MR. Abc",
        "Genre": "Drama"

    },
    {
        "ID": 5,
        "Name": "Batman",
        "Rating": 9,
        "Director": "Christopher Nolan",
        "Genre": "Action"
    }
]



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
    console.log(req.query.idvalue)
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


//Pritesh Sir- consecutive no. API-1---------------------------------------------

router.get('/missing1', function(req, res) {
    let numArray = [1, 2, 3, 4, 6, 7, 8];
    let sum = 0;

    for (let x in numArray) {
        sum = sum + numArray[x]
    }

    let last = numArray.pop()
    let actualSum = last * (last + 1) / 2; // Formula used n(n+1)/2
    let miss = actualSum - sum;
    res.send({
        data: miss
    })
});


// Pritesh sir - not from 1- Sum API -2..............................................

router.get('/missing2', function(req, res) {
    let numArray2 = [44, 45, 46, 48];
    let len = numArray2.length;
    let summ = 0;


    for (let j in numArray2) {
        summ = summ + numArray2[j];
    }

    let first = numArray2[0]
    let last = numArray2.pop()
    let actualSum = (len + 1) * (first + last) / 2; // no. of elements * (first no. + last no.)/2
    let misss = (actualSum - summ);

    res.send({
        data: misss
    });

});




// Sabiha Ma'am - 12 Nov 2021 (Problem 1) Rating and Genre............................

router.get('/specific-movies', function(req, res) {
    let r = req.query.Rating
    let g = req.query.Genre
    const picture = movArr2.filter(x => x.Rating == r && x.Genre == g)
    res.send(picture)

});

// Sabiha Ma'am - 12 Nov 2021 (Problem 2) Add Movie...................................

// router.post('/specific-movies', function(req, res) {
//     let newMovie = {
//         Id: req.body.ID,
//         Name: req.body.Name,
//         Rating: req.body.Rating,
//         Director: req.body.Director,
//         Genre: req.body.Genre,
//     };

//     movArr2.push(newMovie);
//     res.send(movArr2);

// });


// router.post('/specific-movies', function(req, res) {
//     let newMovie = req.body
//     movArr2.push(newMovie)
//     res.send(movArr2)

// });

// Sabiha Ma'am - 12 Nov 2021 (Problem 3) Best Movie...........................

router.get('/best-movie', function(req, res) {

    let highRate = 0;
    let highIndex = 0;

    for (let i = 0; i < movArr2.length; i++) {
        if (movArr2[i].Rating > highRate) {
            highRate = movArr2[i].Rating;
            highIndex = i;
        }
    }

    res.send("The highest rated movie is: " + movArr2[highIndex].Name)
});


// Sabiha Ma'am - 12 Nov 2021 (Problem 4) Director..................................
router.post("/specific-movies", function(req, res) {
    let Rating = req.body.Rating;
    let Director = req.body.Director;

    if (!Director) {
        res.send("Please enter director name");
    } else if (Rating > 10) {
        res.send("Invalid Rating: Please Enter a rating ranging between 1 to 10");
    } else {
        let newMovie = {
            Id: req.body.Id,
            Name: req.body.Name,
            Rating: req.body.Rating,
            Director: req.body.Director,
            Genre: req.body.Genre,
        };

        movArr2.push(newMovie);
        res.send(movArr2);
    }
});