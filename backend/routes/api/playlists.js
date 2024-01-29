const express = require('express');
const router = express.Router();

/* GET playlists listing. */
// http://localhost:8000/api/playlists
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/playlists"
  });
});

module.exports = router;