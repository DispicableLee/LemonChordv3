const { check} = require("express-validator")

const validateAlbumInput = [
    check('title')
    .exists({checkFalsy: true})
    .withMessage('Album must have a Title'),
]

module.exports = validateAlbumInput