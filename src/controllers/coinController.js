const coinModel = require("../models/coinModel.js")
const mongoose = require('mongoose')
const axios = require('axios')




// Get coins/Storecoins/Sortcoins
const getCoin = async function(req, res) {
    let head = req.headers['authorization']
    if (head) {
        let options = {
            method: "get",
            url: "http://api.coincap.io/v2/assets",
            // headers: {
            //     'Authorization': 'Bearer 6f90893a-88c5-4602-b0b0-a8cdf5c2a41d'
            // }
        }

        let allData = await axios(options)
        let coinData = allData.data.data

        for (let i = 0; i < coinData.length; i++) {
            let reqData = {
                    symbol: coinData[i].symbol,

                    name: coinData[i].name,

                    marketCapUsd: coinData[i].marketCapUsd,

                    priceUsd: coinData[i].priceUsd

                }
                // let createCoin = await coinModel.create(reqData)
            await coinModel.findOneAndUpdate({ name: coinData[i].name }, reqData, { upsert: true, new: true });
        }

        let sortArr = coinData.sort(function(a, b) { return a.changePercent24Hr - b.changePercent24Hr })

        res.status(200).send({ data: sortArr })
    } else {
        res.send({ msg: "Api key missing" })
    }

}


module.exports.getCoin = getCoin