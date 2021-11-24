require("../db");
const mongoose = require("mongoose");
const GamesIdModel = require("../models/Games-id.model");
const axios = require("axios");

// function makeRequest(results) {
//   let apiLink = results?.last_appid
//     ? `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=6CFD1621C5C18DE7771DF6C579BF2C25&last_appid=${results.last_appid}`
//     : `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=6CFD1621C5C18DE7771DF6C579BF2C25`;
//   axios.get(apiLink).then((gameList) => {
//       results = gameList.data.response;
//       let gamePromises = [];
//     let gameData = gameList.data.response.apps;
//     gameData.forEach((ele) => {
//       gamePromises.push(GamesIdModel.create({ apps: ele }));
//     });
//       Promise.allSettled(gamePromises)
//       .then((result) => {
//           if (results.have_more_results) {
//               console.log('Doing it');
//               makeRequest(results)
//           } else {
//               console.log('Data Inserted');
//               mongoose.connection.close();
//           }
//       }).catch((err) => {
//           console.log('Failed');
//           mongoose.connection.close()
//       });
//   });
// }

// makeRequest();



GamesIdModel.find().limit(1)
  .then((docs) => {
    let games = [];
    let gameArr = [];
    let myPromises = []
    let gameInfo = []
    docs.forEach(ele => {
      myPromises.push(
        axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${ele.apps.appid}`
        )
      );
    })
    Promise.allSettled(myPromises)
      .then((response) => {
      console.log(response);
    })
  })
        //     let gameArr = []
        //     let games = []
        //     let myPromises = []

        //     gameId.forEach((game, i) => {
        //         myPromises.push(axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId[i].appid}`))
        //     });
        //     Promise.allSettled(myPromises)
        //         .then((gameResponse) => {

        //             gameResponse.forEach((elem, i) => {
        //                 let gameInfo = elem.value.data
        //                 gameArr.push(gameInfo)
        //             })

        //             gameArr.forEach((gameObj, i) => {
        //                 let name = Object.keys(gameObj)
        //                 games.push(gameObj[name])
        //                 let gameData = gameObj[name].data


        //                 Games.create({data: gameData})
        //                 .then(() => {
        //                     res.render("games.hbs", {games})
        //                     // console.log(gameData);
        //                 }).catch((err) => {
        //                     next(err)
        //                 });

        //             })
                    
        //         }).catch((err) => {
        //             next(err)
        //         });
            
        // }).catch((err) => {
        //     next(err)
        // });