const { Schema, model } = require("mongoose");

const gameListSchema = new Schema(
  {
    steam_appid: Number,
    name: String,
    user: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
GameList = model("GameList", gameListSchema);
module.exports = GameList;
