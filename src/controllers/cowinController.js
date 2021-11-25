const axios = require('axios')


// Get state list
const getStates = async function(req, res) {

    try {
        let options = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        };

        const cowinStates = await axios(options)
        let states = cowinStates.data
        console.log(states)
        res.status(200).send({
            msg: "State list fetched successfully",
            data: states
        })
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" })
    }

}
module.exports.getStates = getStates

//  get district list
const getDistrict = async function(req, res) {
    let id = req.params.stateId
    console.log("State id is", id)

    let options = {
        method: "get",
        url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
    }
    let response = await axios(options)
    let district = response.data
    console.log(district)
    res.status(200).send({ msg: "success", data: district })
}

// get by pin

const getByPin = async function (req, res){

    try{ 

        let pin= req.query.pincode
        let date= req.query.date

        let options = {
          method : "get",
          url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let response= await axios(options)
        


        let centers= response.data
        console.log(centers)
        res.status(200).send( {msg: "Success", data: centers} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}


const getOtp = async function (req, res){

    try{ 

         let options = {
          method : "post", // method has to be post
          url : `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
          data: { "mobile": req.body.mobile  } // we are sending the json body in the data 
        }
        let response= await axios(options)

        let id= response.data
        res.status(200).send( {msg: "Success", data: id} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}



//london details



module.exports.getStates = getStates
module.exports.getDistrict = getDistrict
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
