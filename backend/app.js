const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const passport = require('passport');
const path = require('path');
const { isProduction } = require('./config/keys');

// Import your routes
const csrfRouter = require('./routes/api/csrf');
const albumsRouter = require('./routes/api/albums');
const playlistsRouter = require('./routes/api/playlists');
const tracksRouter = require('./routes/api/tracks');
const usersRouter = require('./routes/api/users');

// Initialize the app
const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// CORS setup
const corsOptions = {
  origin: [
    'https://lemonchordv3-frontend.onrender.com', // Production frontend
    'http://localhost:3000' // Development frontend
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // Ensure all HTTP methods are allowed
  allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'Authorization'], // Include headers used in your requests
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

// CSRF Protection middleware
app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction ? "Lax" : false,
    httpOnly: true
  }
}));

// Routes setup
app.use('/api/csrf', csrfRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/playlists', playlistsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/users', usersRouter);

// Serve the frontend's build files in production
// ** Remove this block since you're not serving the frontend from the backend **
// if (isProduction) {
//   app.use(express.static(path.resolve("../frontend/build")));

//   // Serve the frontend's index.html file at all routes NOT starting with /api
//   app.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie('CSRF-TOKEN', req.csrfToken());
//     res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
//   });
// }

// 404 Error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    statusCode,
    errors: err.errors
  });
});

module.exports = app;