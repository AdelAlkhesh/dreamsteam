
const { Schema, model } = require('mongoose');
 
const userSchema = new Schema(
  {
    username: String,
    passwordHash: String
  },
  {
    timestamps: true
  }
);
 
const User = model('User', userSchema);
module.exports = User