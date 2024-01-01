const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
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
        ref: 'Track' // Assuming your Track model is named 'Track'
    }],
    imageUrl: String,
    
})

module.exports = mongoose.model('Album', AlbumSchema)