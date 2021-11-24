const { Schema, model } = require("mongoose");

const GamesIdSchema = new Schema({
    apps: {
        appid: Number,
        name: String,
    }
})

const GamesIdModel = model("GamesId", GamesIdSchema)

module.exports = GamesIdModel