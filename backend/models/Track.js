const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    audioUrl:{
        type: String,
        required: true
    },
    uploader:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    album:{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
    // likes
    // comments
})   


module.exports = mongoose.model('Track', TrackSchema);