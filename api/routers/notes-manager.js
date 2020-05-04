const Router = require('express').Router()
const requestAdapter = require('../helper/request-adapter')

// Importing controllers
const NoteManager = require('../controller/Note/note-controller')

// To get all the notes
Router.get(
    '/',
    NoteManager.getAllNotes
)

// To get a specific note
Router.get(
    '/:id',
    NoteManager.getById
)
// To create a new note
Router.post(
    '/',
    NoteManager.createNewNote
)



module.exports = Router;