var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var albumsRouter = require('./routes/api/albums')
var playlistsRouter = require('./routes/api/playlists')
var tracksRouter = require('./routes/api/tracks')
var usersRouter = require('./routes/api/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/albums', albumsRouter)
app.use('/api/tracks', tracksRouter)
app.use('/api/playlists', playlistsRouter)
app.use('/api/users', usersRouter);

module.exports = app;
