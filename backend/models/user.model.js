const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, trim: true,},
  bankAcct: { type: String, required: true, unique: true, },
  password: { type: String, required: true },
  wallet: {type: Number, required: true},
  stocks: [
    {
      name: String,
      quantity : {type : Number}
    }
  ]
}, 
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;