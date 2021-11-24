const router = require("express").Router()

router.get("/lists", (req, res, next) => {
    res.render("../views/lists.hbs")
})

router.get("/lists/create", (req, res, next) => {
    res.render("../views/list-create.hbs")
})

router.get("/lists/:listId", (req, res, next) => {
    res.render("../views/list-edit.hbs")
})


module.exports = router