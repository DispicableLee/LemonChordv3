const express = require('express');
const Album = require('../../models/Album');
const router = express.Router();
const validateAlbumInput = require('../../validations/albums');
const { validationResult } = require('express-validator');


/* GET ALL ALBUMS */
// http://localhost:8000/api/albums
router.get('/', async function(req, res, next) {
  try{
    const albums = await Album.find().populate({
      path: 'uploader',
      select: '_id username'
    });
    return res.status(200).json(albums)
  }catch(err){
    console.error(err)
    return res.status(500).json({error: "internal server error"})
  }
});

router.get('/:albumId', async function(req,res,next){
  try{
    const album = await Album.findById(req.params.albumId)
    .populate({
      path: 'uploader',
      select: '_id username'
    })
    .populate({
      path: 'tracks',
      select: '_id title audioUrl'
    })
    return res.status(200).send(album)
  }catch(err){
    console.error(err)
    return res.status(500).send({error: "internal server error"})
  }
})


// POST an album
// http://localhost:8000/api/albums
router.post('/', validateAlbumInput, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          debugger
            return res.status(400).json({ errors: errors.array() });
        }

        const newAlbum = new Album(req.body);
        await newAlbum.save();

        return res.status(200).json(newAlbum);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "internal server error" });
    }
});










module.exports = router;