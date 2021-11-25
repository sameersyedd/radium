const axios = require('axios')


const getLondonW=async function (req,res){
    // let q=req.query.city
// let token=req.query.token

let q = "London"
let appid = "e0b49114e825916cfc8e273a116cd003"
let options={
    method:"get",
    url:`http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
    
}
   let london = await axios(options)
    let details = london.data
    res.status(200).send({
        data: details
    })
};

// london temperature

const getLondonTemp = async function(req, res) {
    // let q=req.query.city
    // let token=req.query.token

    let q = "London"
    let appid = "e0b49114e825916cfc8e273a116cd003"
    let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
}

    let london = await axios(options)
    let temperature = london.data.main.temp
    res.status(200).send({
        temp: temperature
    })
};


// get weather and sort

const getWeather = async function (req, res) {
    let cities=  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let cityArr = []

        for (let i=0; i<cities.length; i++){
            let cityObj = {city: cities[i]}
            let respo = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=b73e6e8541e7e1ebd899d77613a75d87`)
        console.log(respo.data.main.temp)
        cityObj.temp = respo.data.main.temp
        cityArr.push(cityObj)
        }
    let sortArr = cityArr.sort(  function(a, b) { return a.temp - b.temp } )
    console.log(sortArr)
    res.status(200).send({status: true, data: sortArr})

}



module.exports.getLondonW = getLondonW
module.exports.getLondonT = getLondonTemp
module.exports.getWeather = getWeather