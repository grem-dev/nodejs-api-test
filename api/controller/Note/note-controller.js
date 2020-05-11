
const NoteServices = require('../../services/NoteServices')

const createNewNote = (req, res, next) => {

    const { _id } = req.headers.token
    NoteServices.createNote({ content: req.body.content, userId: _id }, (err, note) => {
        if (err) next({ message: err.message, status: 500 });
        res.status(200).json({ data: note })
    })
}


const getAllNotes = function (req, res, next) {
    const { _id } = req.headers.token
    NoteServices.listNotes({ userId: _id }, (err, notes) => {
        if (err) next({ err })
        res.status(200).json(notes)
    });
}


const getById = function (req, res, next) {

    NoteServices.getOneById({ id: req.params.id }, (err, note) => {
        // If there is an error or the user is not found return 404
        if (err || !note) return next(err || { status: 404 })

        res.status(200).json({ data: note, status: 200 }).end()
    })
}


const deleteById = function (req, res, next) {

    NoteServices.deleteById({ id: req.params.id }, (err) => {
        if (err) return next({ status: 400 });
        res.status(200).json({ data: { id: req.params.id } }).end()
    })
}




module.exports = {
    createNewNote,
    getAllNotes,
    getById,
    deleteById
}