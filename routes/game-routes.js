const { default: axios } = require("axios")

const router = require("express").Router()


router.get("/games", (req, res, next) => {

    axios.get(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.API_KEY}&max_results=2`)
        .then((gameList) => {
            let gameId = gameList.data.response.apps
            let gameArr = []
            let myPromises = []

            gameId.forEach((game, i) => {
                myPromises.push(axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId[i].appid}`))
            });
            Promise.allSettled(myPromises)
            .then((gameResponse) => {
                //not complete
                console.log(gameResponse)
                    let gameInfo = gameResponse.data
                    let name = Object.keys(gameInfo)[0]

                    // gameArr = gameArr.push(gameInfo[name].data)
                    // res.render("games.hbs", {games: gameArr})
                    // console.log(gameArr, "inside loop");

                    // console.log(gameStats);
                    // return gameStats
                    res.render("games.hbs", {games: gameArr})
                }).catch((err) => {
                    next(err)
                });
            // console.log(gameArr, "outside loop");
           
            
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

    
    // res.render("game-details.hbs",{id})
})




module.exports = router