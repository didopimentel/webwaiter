
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  passwordConf: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    unique: false,
    required: true
  }
})

var User = mongoose.model('User', UserFormSchema)/
module.exports = User;
