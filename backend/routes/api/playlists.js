const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Playlist = require('../../models/Playlist');
const Track = require('../../models/Track')

/* GET playlists listing. */
// http://localhost:8000/api/playlists
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/playlists"
  });
});




// GET a playlist by id
// http://localhost:8000/api/playlists/find/:playlistid
router.get('/find/:playlistid', async function (req, res, next){
  const playlist = await Playlist.findById(req.params.playlistid)
  .populate({
    path: 'tracks',
    select: '_id title audioUrl'
  })
  if(playlist){
    return res.status(200).send(playlist)
  }else{
    return res.status(400).send({})
  }
})


// POST a new playlist
// http://localhost:8000/api/playlists/newplaylist/:userid
router.post('/newplaylist/:userid', async function(req,res,next){
  const user = await User.findById(req.params.userid)
  if(user){
      const newPlaylist = new Playlist(req.body)
      await newPlaylist.save()
      console.log(newPlaylist._id)
      if(!user.playlists){
        user.playlists = []
      }
      user.playlists.unshift(newPlaylist._id)
      await user.save()
      return res.status(200).send(newPlaylist)
  }else{
    return res.status(400).send({})
  }
})

// PUT songs into the playlist's 'tracks' array
// http://localhost:8000/api/playlists/addsongs/:playlistid
router.put('/addsongs/:playlistid', async function(req, res, next) {
  try {
    // Ensure that req.body.TrackIdsToAdd is an array
    if (!Array.isArray(req.body.trackIdsToAdd)) {
      return res.status(400).json({ error: 'trackIdsToAdd must be an array' });
    }

    // Update the playlist by adding the new track IDs to the existing tracks array
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.playlistid,
      { $push: { tracks: { $each: req.body.trackIdsToAdd } } },
      { new: true }
    );

    // Check if the playlist was found and updated
    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Send the updated playlist in the response
    res.status(200).json(updatedPlaylist);
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports = router;