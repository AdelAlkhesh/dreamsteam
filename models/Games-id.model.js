const { Schema, model } = require("mongoose");

const GamesIdSchema = new Schema({
    appid: {
        type: String,
        unique: true
    }
})