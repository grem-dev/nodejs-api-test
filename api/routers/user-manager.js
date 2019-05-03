const Router = require('express').Router()
const requestAdapter = require('../libs/request-adapter')

const userController = require('../controller/user.controller')

Router.post(
    '/',
    (req, res) => {
        userController.createUser(requestAdapter(req))
            .then(data => {
                res.send(data).end()
            })
            .catch(err => {
                res.status(500).send({ error: true, errorMessage: err.message, status: 500 })
            })
    }
)

Router.post(
    '/',
    (req, res) => {
        userController.createUser(requestAdapter(req))
            .then(data => {
                res.send(data).end()
            })
            .catch(err => {
                res.status(500).send({ error: true, errorMessage: err.message, status: 500 })
            })
    }
)



module.exports = Router;