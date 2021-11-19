
const { Schema, model } = require('mongoose');
 
const userPlainSchema = new Schema(
  {
    username: String,
    passwordHash: String
  },
  {
    timestamps: true
  }
);
 
const UserPlain = model('UserPlain', userPlainSchema);
module.exports = UserPlain