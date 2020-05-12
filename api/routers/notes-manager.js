const Router = require('express').Router()
const requestAdapter = require('../helper/request-adapter')

// Importing controllers
const NoteManager = require('../controller/Note/note-controller')
const { isAuth } = require('../middleware')
/**
 * Thus we can tell at the route the specific middlewares
 * if the route needs Autorization or not.
 */

const multer = require('multer')

// To create a new note
Router.post(
    '/',
    isAuth,
    multer().array('arch'),
    NoteManager.createNewNote
)

// To get all the notes
Router.get(
    '/',
    isAuth,
    NoteManager.getAllNotes
)

// To get all the notes
Router.get(
    '/self',
    NoteManager.getAllNotes
)

// To get a specific note
Router.get(
    '/:id',
    NoteManager.getById
)

// To delete one note by using an Id
Router.delete(
    '/:id',
    isAuth,
    NoteManager.deleteById
)




module.exports = Router;