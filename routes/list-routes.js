const router = require("express").Router()
const GamesIdModel = require("../models/Games-id.model")
const GameList = require("../models/Gamelist.model")

router.get("/lists", (req, res, next) => {
    GameList.find()
    .populate()
    .then((lists) => {
        console.log(lists);
        res.render("../views/lists.hbs", {lists})
    }).catch((err) => {
        
    });
    
})

router.get("/lists/create", (req, res, next) => {
    res.render("../views/list-create.hbs")
})

router.post("/lists/create", (req, res, next) => {
    // console.log(req.body);

    GameList.create(req.body)
    .then(() => {
        res.redirect("/lists")
    })
    .catch((err) => {
        console.log(err);
    });
})



router.get("/lists/:listId", (req, res, next) => {
    res.render("../views/list-edit.hbs")
})


module.exports = router