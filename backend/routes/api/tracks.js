const express = require('express');
const router = express.Router();

/* GET tracks listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/tracks"
  });
});

module.exports = router;