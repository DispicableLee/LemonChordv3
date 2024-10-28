const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const Playlist = require('../models/Playlist')
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
exports.requireUser = passport.authenticate('jwt', { session: false });


passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, async function (email, password, done) {
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
    });
  } else
    done(null, false);
}));
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

exports.loginUser = async function(user) {
  try {
    // Populate playlists and tracks fields for the user
    await user.populate({
      path: 'playlists',
      select: '_id title'
    })
    await user.populate({
      path: 'tracks',
      select: '_id title'
    })

    // Generate token
    const token = await jwt.sign(
      { _id: user._id },
      secretOrKey,
      { expiresIn: 3600 }
    );
    console.log("token", token)

    // Return user info and token
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        playlists: user.playlists,
        tracks: user.tracks
      },
      token
    };
  } catch (err) {
    throw err;
  }
};




exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};