const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User')
const Track = require('../../models/Track')
const { requireUser } = require('../../config/passport');
const validateTrackInput = require('../../validations/tracks')


/* GET all tracks */
// http://localhost:8000/api/tracks ======================
router.get('/', async (req, res, next) =>{
  try {
    const tracks = await Track.find()
    return res.status(200).send(tracks)
  }
  catch(err) {
    return res.json([]);
  }
});

// POST a track
// http://localhost:8000/api/tracks ====================
router.post('/', validateTrackInput, async(req,res, next)=>{
  const newTrack = new Track(req.body)
  newTrack.save().catch((err) => console.log(err));
  return res.status(200).send(newTrack);
})



module.exports = router;