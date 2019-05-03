const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
})

module.exports = mongoose.model('User', userSchema)