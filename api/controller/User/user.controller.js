const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Importing user services
const UserServices = require('../../services/UserServices')


/**
 * 
 * @param {UserInfo} data 
 */
function createUser(req, res, next) {

    UserServices.createNewUser(req.body)
        .then(payload => {
            res.json(payload)
        })
        .catch(err => next(err))
}

function getUser(req, res, next) {
    UserServices.getOne({ ...req.params })
        .then(userDate => {
            res.json(userDate).end()
        })
        .catch(err => {
            next({ message: 'User not exist', status: 404 })
        })
}

function loginUser(req, res, next) {
    UserServices.login({ email: req.body.email, password: req.body.password })
        .then(result => {
            res.json(result).end()
        })
        .catch(err => {
            next({ message: 'Invalid credentials', status: 404 })
        })
}

function getSelfInfo(req, res, next) {
    const token = req.headers.token;
    if (!token) next({ status: 400 })
    UserServices.getSelfInfo(token)
        .then(data => res.status(200).json(data).end())
        .catch(err => next(err))
}


module.exports = {
    createUser,
    getUser,
    loginUser,
    getSelfInfo
};