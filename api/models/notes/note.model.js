
const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "can't be blank"]
    },
    tags: [{
        type: String,
    }],
    createAt: {
        type: String,
        default: new Date(),
    },
})


noteSchema.methods.toJSON = function () {
    return Object.freeze({
        content: this.content,
        tags: this.tags,
        _id: this._id,
        createAt: this.createAt
    })
}


module.exports = mongoose.model('Note', noteSchema)