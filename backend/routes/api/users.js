const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Playlist = require('../../models/Playlist')
const passport = require('passport');

const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

// GET one user
// http://localhost:8000/api/users/getuser/:userid
router.get('/getuser/:userid', async function(req, res, next){
  try{
    const user = await User.findById(req.params.userid)
    .populate({
      path: 'albums',
      select: '_id title'
    })
    .populate({
      path: 'playlists',
      select: '_id title'
    })
    return res.status(200).send(user)
  }catch(err){
    console.error(err)
    return res.status(400).send({error: err})
  }
})


// ⁡⁣⁢⁡⁢⁣⁢===================== User Auth ==============================⁡
// ⁡⁢⁣⁢user signup⁡
//=============== POST a new user =================
router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }





  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    tracks: [],
    albums: [],
    playlists: []
  });

    const likedTracksPlaylist = new Playlist({
    title: 'Liked Tracks',
    uploader: newUser._id, // Assuming you have a reference to the newly created user
    tracks: [], // Initialize tracks array to be empty for now
    // Add imageUrl if needed
  });

  // Save the "likedTracks" playlist to the database
  await likedTracksPlaylist.save();

  // Push the "likedTracks" playlist to the user's playlists array
  newUser.playlists.push(likedTracksPlaylist._id);

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
      }
      catch(err) {
        next(err);
      }
    })
  });
});
// ⁡⁢⁣⁢user login⁡
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    albums: req.user.albums,
    tracks: req.user.tracks,
    playlists: req.user.playlists
  });
});

module.exports = router;