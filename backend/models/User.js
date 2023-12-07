const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  tracks: {
    type: Array,
    required: true
  },
  albums: {
    type: Array,
    required: true
  },
  playlists: {
    type: Array,
    required: true
  }
//   playlists
//   etc...

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);