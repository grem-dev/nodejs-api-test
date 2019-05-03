const Router = require('express').Router()
const requestAdapter = require('../helper/request-adapter')

// Importing controllers

Router.get(
    '/',
    (req, res) => {
        const httpRequest = requestAdapter(req);
        res.send(httpRequest).end()
    }
)



module.exports = Router;