let mid1 = function(req, res, next) {
    //console.log("Inside mid 1")
    //console.log(req.headers)
    let headerValue = req.headers['isfreeapp']
        //console.log(typeof headerValue)
    let freeApp
    if (!headerValue) {
        return res.send({ message: 'Header missing' })
    }

    if (headerValue === 'false') {
        freeApp = false
    } else {
        freeApp = true
    }
    req.isFreeAppUser = freeApp

    next()
}

module.exports.mid1 = mid1