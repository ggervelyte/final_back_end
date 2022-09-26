const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likesModel = new Schema({
    user: {
        type: String,
        required: true
    },
    userImage: {
        type: [String],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('finalLikesModel', likesModel)