const jwt = require("jsonwebtoken")

// middleware
const mid1 = function(req, res, next) {
    let token = req.headers['x-auth-token']
    if (token) {
        let validToken = jwt.verify(token, "sameer")
        console.log("helo", validToken._id)
        console.log(req.params.userId)
        if (validToken._id == req.params.userId) { //updated logic for 3&4
            if (validToken) {
                next()
            } else {
                res.send({ msg: "Invalid token" })
            }
        } else {
            res.send({ Error: "ID Mismatched" })
        }
    } else {
        res.send({ Error: "Token not present" })
    }
}


module.exports.mid1 = mid1