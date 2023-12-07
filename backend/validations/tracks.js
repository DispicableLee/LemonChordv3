const { check } = require("express-validator");
// const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validateTrackInput = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Tracks must have titles'),
  check('audioUrl')
    .exists({ checkFalsy: true }),
  check('uploaderUrl')
    .exists({ checkFalsy: true }),
];

module.exports = validateTrackInput;