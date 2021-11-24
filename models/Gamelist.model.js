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
    is_private: Boolean,
    description: String, 
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
