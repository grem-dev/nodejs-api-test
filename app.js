const Server = require('./api/architecture/express.server')
const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const config = require('./config');
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// Starting a new server instance
const app = new Server({ port: config.port })

app
    .setMiddleware(require('cors')())
    .setMiddleware(bodyParser.json())
    .setMiddleware(bodyParser.urlencoded({ extended: true }))
    .setMiddleware(express.static(path.join(__dirname, '/public')))

// Developing configuration
if (config.NODE_ENV === 'development') {
    app.setMiddleware(require('morgan')('dev'))
}

// Setting the router
app.setRouter({ prefix: '/api/v0', routes: require('./api/router.js') })


/**
 * Error handler callback
 */
app.setMiddleware((err, req, res, next) => {

    res.status(err.status || 500);
    res.json({ error: { message: err.message }, status: err.status || 500 })
})


/**
 * TODO: I need to configure a handler that only return a file
 * in this case an html - > I will call this a file provider 
 * this will server the public files, like htlm, css, javacript, imagens, etc.
 */

// Setting the Public views Router
// app.setRouter({ prefix: '/', routes: require('./public/router') })

module.exports = app;