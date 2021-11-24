const { Schema, model } = require("mongoose");

const gameListSchema = new Schema(
  {
    games: [{
      apps: {
        appid: Number,
        name: String
      }
    }],
    name: String,
    is_private: String,
    description: String, 
    user: {
      type: [Schema.Types.ObjectId],
      ref: "UserInfo",
    },
   
  },
  {
    timestamps: true,
  }
);
GameList = model("GameList", gameListSchema);
module.exports = GameList;
