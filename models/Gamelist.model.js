const { Schema, model } = require("mongoose");

const gameListSchema = new Schema(
    {
      
        steam_appid: Number,
        name: String, 
        data: {
            type: [Schema.Types.ObjectId],
            ref: 'Games'
      }
  },
  {
    timestamps: true,
  }
);
GameList = model("GameList", gameListSchema);
module.exports = GameList;
