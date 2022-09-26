const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: [String],
        required: false,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNUq3JK9oohRMc5rue7sMjfwS2Mtn-DACvQ&usqp=CAU"
    }
})

module.exports = mongoose.model('finalUserModel', userModel)