const { check} = require("express-validator")
const handleValidationErrors = require('./handleValidationErrors')

const validatePlaylistInput = [
    check('title')
    .exists({checkFalsy: true})
    .withMessage('Playlist must have a title'),
    handleValidationErrors
]

module.exports = validatePlaylistInput