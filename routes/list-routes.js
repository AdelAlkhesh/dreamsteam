const router = require("express").Router()
const GamesIdModel = require("../models/Games-id.model")
const GameList = require("../models/Gamelist.model")

router.get("/lists", (req, res, next) => {
    GameList.find()
    
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
    const {listId} = req.params
    GameList.findById(listId)
    .then((list) => {
        console.log(list)
        res.render("../views/list-details.hbs", {list})
    }).catch((err) => {
        next(err)
    });
})

router.get("/lists/:listId/edit", (req, res, next) => {
    const {listId} = req.params
    GameList.findById(listId)
    .then((result) => {
        console.log(result)
        res.render("list-edit.hbs", {result})
    }).catch((err) => {
        next(err)
    });
})


router.post("/lists/:listId/edit", (req, res, next) => {
    const {listId} = req.params
    const {name, description, games} = req.body
    GameList.findByIdAndUpdate(listId, {name, description, games})
    .then(() => {
        res.redirect(`/lists/${listId}`)
    }).catch((err) => {
        next(err)
    });
})


router.post("/lists/:listId/delete", (req, res, next) => {
    const {listId} = req.params
    GameList.findByIdAndRemove(listId)
        .then((result) => {
            res.redirect("/lists")
        }).catch((err) => {
            next(err)
        });
})

module.exports = router