const { default: axios } = require("axios")

const router = require("express").Router()
const Games = require("../models/Games.model")


// router.get("/gamelists", (req, res, next) => {

// })

// router.get('/createlist', (req, res, next) => {

// })

// router.post("/createlist", (req, res, next) => {

// });


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