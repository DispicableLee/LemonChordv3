const express = require('express');
const router = express.Router();

/* GET albums listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/albums"
  });
});

module.exports = router;