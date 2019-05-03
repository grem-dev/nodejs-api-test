const Router = require('express').Router()
const requestAdapter = require('../libs/request-adapter')

// Importing controllers

Router.get(
    '/',
    (req, res) => {
        res.send('Esto funciona').end()
    }
)



module.exports = Router;