const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User')
const Track = require('../../models/Track')
const { requireUser } = require('../../config/passport');
const validateTrackInput = require('../../validations/tracks');
const { validationResult } = require('express-validator');
const Album = require('../../models/Album');


/* GET all tracks */
// http://localhost:8000/api/tracks ======================
router.get('/', async (req, res, next) => {
  try {
    const tracks = await Track.find()
    .populate({
      path: 'uploader', // Populate the 'uploader' and 'album' fields
      select: '_id username', // Select the fields you want to include
    })
    .populate({
    path: 'album',
    select: '_id title imageUrl',
  });

    return res.status(200).json(tracks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a track
// http://localhost:8000/api/tracks/newtrack/:userid ====================
router.post('/newtrack/:userid', validateTrackInput, async(req,res, next)=>{
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    const user = await User.findById(req.params.userid)
    if(user){
      const newTrack = new Track(req.body);
      await newTrack.save()
      user.tracks.unshift(newTrack._id)
      if(req.body.album){
        const album = await Album.findById(req.body.album)
        album.tracks.unshift(newTrack._id)
        await album.save()
      }
      await user.save()
      return res.status(200).json(newTrack)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json({errors: errors.array()})
  }
  // const newTrack = new Track(req.body)
  // newTrack.save().catch((err) => console.log(err));
  // return res.status(200).send(newTrack);
})






module.exports = router;