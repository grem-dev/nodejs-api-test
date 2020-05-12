
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
    access: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'private'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    files: [{
        fileName: String,
        fileType: String,
        uri: String
    }]
})


noteSchema.methods.toJSON = function () {
    return Object.freeze({
        content: this.content,
        tags: this.tags,
        _id: this._id,
        createAt: this.createAt,
        access: this.access,
        files: this.files,
    })
}



module.exports = mongoose.model('Note', noteSchema)