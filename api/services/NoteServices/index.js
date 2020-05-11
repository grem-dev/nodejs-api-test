
const NoteModel = require('../../models/notes/note.model')





const createNote = ({ content, userId, access, images, video }, cb) => {
    const note = new NoteModel();
    note.content = content;
    note.userId = userId;
    note.access = access ? access : 'private'
    note.save().then(function () {
        let payload = note.toJSON()
        cb(undefined, payload)
    }).catch(cb)
}


const listNotes = ({ amount = 10, userId }, cb) => {
    console.log(userId)
    NoteModel.find({ userId }).then(function (notes) {
        cb(undefined, { notes: notes.map(item => item.toJSON()) });
    }).catch(cb);
}


const getOneById = ({ id }, cb) => {

    NoteModel.findById(id).then(function (note) {
        cb(undefined, note)
    })
        .catch(cb)
}

const deleteById = ({ id }, cb) => {
    NoteModel.findByIdAndDelete(id).then(function () {
        cb(undefined)
    }).catch(cb);

}


module.exports = {
    createNote,
    listNotes,
    getOneById,
    deleteById
}