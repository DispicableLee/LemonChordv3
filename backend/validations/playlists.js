const { check} = require("express-validator")

const validatePlaylistInput = [
    check('title')
    .exists({checkFalsy: true})
    .withMessage('Playlist must have a title')
]