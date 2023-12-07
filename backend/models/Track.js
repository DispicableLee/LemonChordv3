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
    uploaderId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    albumId: String
    // likes
    // comments
})   


module.exports = mongoose.model('Track', TrackSchema);