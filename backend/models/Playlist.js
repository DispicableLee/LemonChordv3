const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
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

module.exports = mongoose.model('Playlist', PlaylistSchema)