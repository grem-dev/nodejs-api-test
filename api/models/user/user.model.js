const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 5,
        trim: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 6,
        trim: true
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        minlength: 5,
        trim: true,
        unique: true
    }
})

/**
 * Schema methods
 */

userSchema.methods.toJSON = function () {
    return Object.freeze({
        username: this.username,
        email: this.email,
        _id: this._id
    })
}


module.exports = mongoose.model('User', userSchema)