var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
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
  level: {
    type: String,
    unique: false,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
