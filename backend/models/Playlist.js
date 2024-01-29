const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    uploader:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }],
    imageUrl: String
})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;