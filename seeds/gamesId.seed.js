require("../db")
const mongoose = require("mongoose")
const GamesIdModel = require("../models/Games-id.model")
const axios = require("axios")

axios.get(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.API_KEY}&max_results=5`)
    .then((gameList) => {
        let gameId = gameList.data.response.apps
        console.log(gameId)
        return GamesIdModel.insertMany(gameList)
    })
    .then(() => {
        console.log("data inserted")
        mongoose.connection.close
    })
    .catch((err) => {
        console.log("Problems", err)
        mongoose.connection.close
    });