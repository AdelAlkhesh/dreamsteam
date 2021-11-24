require("../db");
const mongoose = require("mongoose");
const GamesIdModel = require("../models/Games-id.model");
const axios = require("axios");

function makeRequest(results) {
  let apiLink = results?.last_appid
    ? `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=6CFD1621C5C18DE7771DF6C579BF2C25&last_appid=${results.last_appid}`
    : `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=6CFD1621C5C18DE7771DF6C579BF2C25`;
  axios.get(apiLink).then((gameList) => {
      results = gameList.data.response;
      let gamePromises = [];
      let gameData = gameList.data.response.apps;
      gameData.forEach((ele) => {
        gamePromises.push(GamesIdModel.create({ apps: ele }));
      });
      Promise.allSettled(gamePromises)
      .then((result) => {
          if (results.have_more_results) {
              console.log('Doing it');
              makeRequest(results)
          } else {
              console.log('Data Inserted');
              mongoose.connection.close();
          }
      }).catch((err) => {
          console.log('Failed');
          mongoose.connection.close()
      });
  });
}

makeRequest();

