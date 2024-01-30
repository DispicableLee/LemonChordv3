const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Playlist = require('../../models/Playlist');

/* GET playlists listing. */
// http://localhost:8000/api/playlists
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/playlists"
  });
});
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

module.exports = router;