const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema(
  {
    players: 
      {
        steamid: String,
        communityvisibilitystate: Number,
        profilestate: Number,
        personaname: String,
        profileurl: String,
        avatar: String,
        avatarmedium: String,
        avatarfull: String,
        avatarhash: String,
        lastlogoff: Number,
        personastate: Number,
        primaryclanid: String,
        timecreated: Number,
        personastateflags: Number,
      },
    
  },
  {
    timestamps: true,
  }
);
UserInfo = model("UserInfo", userInfoSchema);
module.exports = UserInfo;
