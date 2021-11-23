const { default: axios } = require("axios")

const router = require("express").Router()
const Games = require("../models/Games.model")


router.get("/games", (req, res, next) => {

    axios.get(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.API_KEY}&max_results=1
    `)
        


        .then((gameList) => {
            let gameId = gameList.data.response.apps
            let gameArr = []
            let games = []
            let myPromises = []

            gameId.forEach((game, i) => {
                myPromises.push(axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId[i].appid}`))
            });
            Promise.allSettled(myPromises)
                .then((gameResponse) => {

                    gameResponse.forEach((elem, i) => {
                        let gameInfo = elem.value.data
                        gameArr.push(gameInfo)
                    })

                    gameArr.forEach((gameObj, i) => {
                        let name = Object.keys(gameObj)
                        games.push(gameObj[name])
                        let gameData = gameObj[name].data


                        Games.create({data: gameData})
                        .then(() => {
                            res.render("games.hbs", {games})
                            // console.log(gameData);
                        }).catch((err) => {
                            next(err)
                        });

                    })

                }).catch((err) => {
                    next(err)
                });
            
        }).catch((err) => {
            next(err)
        });
})


router.get("/games/:id", (req, res, next) => {
    const {id} = req.params
    axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    .then((gameResponse) => {
        
        let gameInfo = gameResponse.data
        let name = Object.keys(gameInfo)[0]
        let gameData = gameInfo[name]
        res.render("game-details.hbs", {gameData})
        // console.log(gameData.data.name)
        
    }).catch((err) => {
        next(err)
    });

})




module.exports = router