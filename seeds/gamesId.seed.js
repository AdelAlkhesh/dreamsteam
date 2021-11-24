require("../db")
const mongoose = require("mongoose")
const GamesIdModel = require("../models/Games-id.model")
const axios = require("axios")

axios.get(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=6CFD1621C5C18DE7771DF6C579BF2C25`)
    .then((gameList) => {
        let gameData = gameList.data.response.apps
        let results = 

        gameData.forEach(element => {
            GamesIdModel.create({apps: element})
        });
        
    })
    .then(() => {
        console.log("data inserted")
        mongoose.connection.close
    })
    .catch((err) => {
        console.log("Problemssssssssssssssssss")
        mongoose.connection.close
    });