const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    uploader:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tracks: Array,
    imageUrl: String,
    
})

module.exports = mongoose.model('Album', AlbumSchema)