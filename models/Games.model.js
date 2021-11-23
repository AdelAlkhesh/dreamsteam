const { Schema, model } = require("mongoose");

const gamesSchema = new Schema(
  {
    data: {
      steam_appid: Number,
      name: String,
      header_image: String,
      price_overview: {
        currency: String,
        initial: Number,
        final: Number,
        discount_percent: Number,
        initial_formatted: String,
        final_formatted: String,
      },
      short_description: String,
      developers: String,
      metacritic: {
        score: Number,
      },
      categories: [
        {
          description: String,
        },
      ],
      Genre: [
        {
          description,
        },
      ],
      recommendations: {
        total: Number,
      },
      release_date: {
        coming_soon: Boolean,
        date: String,
      },
      support_info: {
        url: String,
      },
      player_count: Number,
      
    },
  },
  {
    timestamps: true,
  }
);
Games = model("Games", gamesSchema);
module.exports = Games;
