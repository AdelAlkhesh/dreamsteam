const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    steamid: String,
  },
  {
    timestamps: true,
  }
);
User = model("User", userSchema);
module.exports = User;
