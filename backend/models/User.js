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
  tracks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tracks',
    required: true
  }],
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true 
  }],
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  }]
//   playlists
//   etc...

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);