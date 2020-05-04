const mongoose = require('mongoose')

// const NoteModel = mongoose.model('Note')
const NoteModel = require('../../models/notes/note.model')



const createNewNote = (req, res, next) => {

    const note = new NoteModel();
    note.content = req.body.content;
    note.save().then(function () {
        let payload = note.toJSON()
        return res.json(payload);
    }).catch(next);
}

const getAllNotes = function (req, res, next) {
    NoteModel.find().then(function (notes) {
        return res.json({ notes: notes.map(item => item.toJSON()) });
    }).catch(next);
}

const getById = function (req, res, next) {
    NoteModel.findById(req.params.id).then(function (note) {
        return res.json({ data: note });
    }).catch(next);
}


const deleteById = function (req, res, next) {
    NoteModel.deleteOne({ _id: req.params.id }).then(function () {
        return res.json({});
    }).catch(next);
}




module.exports = {
    createNewNote,
    getAllNotes,
    getById,
    deleteById
}