
const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "can't be blank"]
    },
    tags: [{
        type: String,
    }]
})


noteSchema.methods.toJSON = function () {
    return Object.freeze({
        content: this.content,
        tags: this.tags,
        _id: this._id
    })
}


module.exports = mongoose.model('Note', noteSchema)