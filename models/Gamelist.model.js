const { Schema, model } = require("mongoose");

const gameListSchema = new Schema(
  {
    
    name: String,
    isPrivate: Boolean,
    description: String,
    games: [{
      apps: {
        appid: Number,
        name: String
    }
    }],
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
