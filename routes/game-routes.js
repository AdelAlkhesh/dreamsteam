const { default: axios } = require("axios")

const router = require("express").Router()


router.get("/games", (req, res, next) => {

    axios.get(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.API_KEY}&max_results=1`)
        .then((gameList) => {
            let gameId = gameList.data.response.apps
            let gameArr = []

            gameId.forEach((game, i) => {

                axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId[i].appid}`)
                .then((gameResponse) => {
                    let gameInfo = gameResponse.data
                    // let whatever = gameId[i].appid
                    
                    let name = Object.keys(gameInfo)[0]
                    gameArr.push(gameInfo[name].data)
                    // console.log(gameInfo[name].data);
                    console.log(gameArr);
                }).catch((err) => {
                    next(err)
                });
            });
            // console.log(gameArr);
            res.render("games.hbs", {games: gameArr})
        }).catch((err) => {
            next(err)
        });
})

module.exports = router