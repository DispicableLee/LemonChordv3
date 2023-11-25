var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');
const debug = require('debug');


const csrfRouter = require('./routes/api/csrf');
var albumsRouter = require('./routes/api/albums')
var playlistsRouter = require('./routes/api/playlists')
var tracksRouter = require('./routes/api/tracks')
require('./models/User');
var usersRouter = require('./routes/api/users');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ADD THIS SECURITY MIDDLEWARE
// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, the Express 
  // server will serve the React files statically.)
  app.use(cors());
}


// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);




app.use('/api/albums', albumsRouter)
app.use('/api/tracks', tracksRouter)
app.use('/api/playlists', playlistsRouter)
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);


// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  })
});

module.exports = app;
